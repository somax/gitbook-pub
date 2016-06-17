repoName=$1
bookDescription=$2

gitbook build "repos/$repoName" "books/$repoName" --log warn
echo "$bookDescription" > "books/$repoName/.description"