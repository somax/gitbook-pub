repoName=$1
# bookDescription=$2

gitbook build "repos/$repoName" "books/$repoName" --log warn
cp "repos/$repoName/book.json" "books/$repoName"
# echo "$bookDescription" > "books/$repoName/.description"