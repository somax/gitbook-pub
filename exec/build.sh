repoName=$1

# install plugins
gitbook install "repos/$repoName"

# build book
gitbook build "repos/$repoName" "books/$repoName" --log warn

# copy book.json
cp "repos/$repoName/book.json" "books/$repoName"
