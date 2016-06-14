const express = require('express'),
    app = express(),
    exec = require('exec'),
    fs = require('fs'),
    serveIndex = require('serve-index');

const
    hostname = '0.0.0.0',
    port = process.argv[2] || process.env.PORT || 3000,
    bookPath = '/books',
    execPath = '/exec',
    staticBookPath = __dirname + bookPath,
    staticExecPath = __dirname + execPath;


// home page
app.get('/', function(req, res) {
    res.send('Welcome to Gitbook Pub')
})

// 发布触发器
app.get('/webhook', function webhook(req, res) {
    console.log(__dirname);

    repo = req.query.repo || '';

    var _tmp = repo.split('/');
    var _bookname = _tmp[_tmp.length - 1].replace('.git', '');

    _cmd = 'cd "' + __dirname +'" && exec/clone.sh ' + repo + ' ' + _bookname + ' && exec/build.sh ' + _bookname;

    exec(_cmd, function(err, out, code) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(out);
        }
    });
})


// 根据目录列出书籍
app.use('/books', express.static(staticBookPath));
app.use('/books', serveIndex(staticBookPath));


app.listen(port)

console.log(`Gitbook Pub running at http://${hostname}:${port}/`);