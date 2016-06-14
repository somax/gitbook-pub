const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    serveIndex = require('serve-index'),
    exec = require('child_process').execFile;



const
    hostname = '0.0.0.0',
    port = process.argv[2] || process.env.GITBOOK_PUB_PORT || 3000,
    bookPath = '/books',
    execPath = '/exec',
    staticBookPath = __dirname + bookPath,
    staticExecPath = __dirname + execPath;

app.use(bodyParser.json());

// home page
app.get('/', function(req, res) {
    res.send('Welcome to Gitbook Pub')
})

// 发布触发器
app.post('/webhook', function webhook(req, res) {
    var project = req.body.project;

    if(!project){
        res.status(500).send('argument error')
    }

    var _repo = project.git_ssh_url;
    var _repoName = project.name;
    var _bookName = project.description || _repoName;


    console.log('Publishing ' + _bookName + '...');

    exec('cd', [__dirname]);
    exec('exec/clone.sh', [_repo, _repoName], (error, stdout, stderr) => {
        if (error) {
            console.log('[error]\n', stdout, stderr);
            res.status(500).send(stderr);
        } else {
            console.log('Success!\n', stdout, stderr);
            // res.status(200).send(stdout + stderr);
            var _preOut = stdout + '\n' + stderr;
            console.log('Building book...');
            exec('exec/build.sh', [_repoName, _bookName], (error, stdout, stderr) => {
                if (error) {
                    console.log('[error]\n', stdout, stderr);
                    res.status(500).send(stderr);
                } else {
                    console.log('Success!\n', stdout, stderr);
                    res.status(200).send(_preOut + stdout + stderr + 'Building book success!');
                }
            });
        }
    });

})



// 根据目录列出书籍
app.use('/books', express.static(staticBookPath));
app.use('/books', serveIndex(staticBookPath));


app.listen(port)

console.log(`Gitbook-Pub running at http://${hostname}:${port}/`);
