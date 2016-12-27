# Gitbook Pub
This project is JKR3-Team used to automatically publish documents from gitlab.

## Deployment
form your develop computer
```
$ npm run deploy
```
or at server
```
npm run pm2
```

## Usage

### build book manually

```
exec/build.sh <bookRepoName>
```

### Add webhook to gitlab

1. create new book repos and push it to gitlab.
2. go to `http://git.jkr3.com/<userid>/<your.book>/hooks`.
3. copy and paste `http://book.jkr3.com/webhook` in `URL`.
4. make sure `Trigger` > `Push events` is checked
5. and then press `Add Webhook` button
6. Done.


> so, each time your push new commite to gitlab, it will automatic rebuild it.
> you can press the `Test Hook` button to rebuilding your books immediately.

### Reading books
Once the new version of the document push to gitlab, you will immediately see the latest version of the document in `http://book.jkr3.com/books`

## Auth with GitLab

Setup auth config:

Edit or create config file `config/config[.NODE_ENV].json`

```
{
    "authGitlab": {
        "clientID": "GITLAB_CLIENT_ID",
        "clientSecret": "GITLAB_CLIENT_SECRET",
        "callbackBaseURL": "http://your-app.com/",
        "baseURL": "https://gitlab.your-company.com/", 
        "rejectUnauthorized":true
    }
}

```

If your GitLab site use self-signed certificate, you may got `InternalOAuthError: Failed to obtain access token` error, just set `rejectUnauthorized` to `false`.

## SSL

Create self-signed certificate:

```

# Create a 2048 bit private key
sudo openssl genrsa -out "./ssl/gitbook-pub.key" 2048

# This command generates the certificate signing request
sudo openssl req -new -key "./ssl/gitbook-pub.key" -out "./ssl/gitbook-pub.csr"

# Create the signed certificate:
sudo openssl x509 -req -days 365 -in "./ssl/gitbook-pub.csr" -signkey "./ssl/gitbook-pub.key"  -out "./ssl/gitbook-pub.crt"
```