const auth = require('oauth-gitlab');
const config = require('ez-config-loader')('config/config');

// 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.authGitlab.rejectUnauthorized ? '1' : '0';

module.exports = function(app) {
    auth(app, config.authGitlab);



    app.get('/login', (req, res) => {
        res.send(`<a href="/auth/gitlab">Log In with GitLab: ${config.authGitlab.baseURL}</a>`);
    });

    app.get('/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        (req, res) => {
            res.send({ user: req.user });
            // res.send({user:req});
        });
};
