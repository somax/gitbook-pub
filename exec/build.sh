repoName=$1
bookName=$2

gitbook build "repos/$repoName" "books/$bookName" --log warn