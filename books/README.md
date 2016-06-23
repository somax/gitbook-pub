Add webhook to gitlab
=====================

1. create new book repo and push it to gitlab.
2. go to `http://git.jkr3.com/<userid>/<your.book>/hooks`.
3. copy and paste `http://book.jkr3.com/webhook` in `URL`.
4. make sure `Trigger` > `Push events` is checked
5. and then press `Add Webhook` button
6. Done.

## Deploy Keys
you may need add deploy Key to your repo

> so, each time your push new commite to gitlab, it will automatic rebuild it.
> you can press the `Test Hook` button to rebuilding your books immediately.