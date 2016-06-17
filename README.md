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

## usage

### Add webhook to gitlab

1. vist `http://git.jkr3.com/<userid>/<your.book>/hooks`
2. paste `http://book.jkr3.com/webhook` in URL
3. make sure `Trigger` > `Push events` is checked
4. press `Add Webhook` button

> you can press the `Test Hook` button to test it.

### Readbook
Once the new version of the push to gitlab, you can immediately see the latest version of the document in `http://book.jkr3.com/books`