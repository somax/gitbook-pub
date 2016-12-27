const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    url = require('url'),
    fs = require('fs'),
    serveIndex = require('gitbook-pub-index'),
    exec = require('child_process').execFile;

const
    hostname = '0.0.0.0',
    port = process.argv[2] || process.env.GITBOOK_PUB_PORT || 3000,
    bookPath = '/books',
    execPath = '/exec',
    staticBookPath = __dirname + bookPath,
    staticExecPath = __dirname + execPath;




require('./lib/auth')(app);



app.use(bodyParser.json());

// home page
app.get('/', function(req, res) {
    // res.send('Welcome to Gitbook Pub');
    res.redirect('/books');
});


// app.get('/', (req, res) => {
//     let isLogin = req.hasOwnProperty('user');
//     // let username = isLogin ? req.user.displayName : 'guset';
//     // res.send(`Hello ${username}! <br><a href="/login">login</a> <a href="/logout">logout</a> <br><a href="/profile">profile</a> <a href="/books">books</a> `);
//     if(isLogin){
//         res.redirect('/books');
//     }else{
//         res.redirect('/login');
//     }
// });

// webHook
app.post('/webhook', function webhook(req, res) {
    let project = req.body.project;

    if (!project) {
        res.status(500).send('argument error');
    }

    let _repo = project.git_ssh_url;
    let _repoName = project.name;
    let _bookDescription = project.description || '';

    console.log('Publishing ' + _repoName + '...\n', _bookDescription);

    exec('cd', [__dirname]);
    exec('exec/clone.sh', [_repo, _repoName], (error, stdout, stderr) => {
        if (error) {
            console.log('[error]\n', stdout, stderr);
            res.status(500).send(stderr);
        } else {
            console.log('Success!\n', stdout, stderr);
            let _preOut = stdout + '\n' + stderr;
            console.log('Building book...');
            exec('exec/build.sh', [_repoName], (error, stdout, stderr) => {
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

});



// list of books
app.use('/books',
    require('connect-ensure-login').ensureLoggedIn(),
    express.static(staticBookPath));
let serveIndexOption = { 'icons': true, 'view': 'cover' };
const ServeIndexHandler = serveIndex(staticBookPath, serveIndexOption);

// http://.../books/?view=details
app.use('/books', function(req, res, next) {
    const _url = url.parse(req.url, true);
    if (_url.query.view) {
        console.log(_url.query.view);
        ServeIndexHandler.setView(_url.query.view);
    }
    next();
});

app.use('/books', ServeIndexHandler);



// app.listen(port);


// ------------- ssl 
// 
let https = require('https');

let keyPath = 'ssl/gitbook-pub.key';
let certPath = 'ssl/gitbook-pub.crt';

let hskey = fs.readFileSync(keyPath);
let hscert = fs.readFileSync(certPath);

let options = {
    key: hskey,
    cert: hscert
};


https.createServer(options, app).listen(port);

console.log(`Gitbook-Pub running at https://${hostname}:${port}/`);
