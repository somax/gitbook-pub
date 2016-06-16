reposDir=repos
repoUrl=$1
repoName=$2

mkdir -p "$reposDir" && cd "$reposDir"

if [ -d $repoName ]
then
	echo "Update the book $repoName"
    cd "$repoName" && git pull
else
	echo "Geting a new book from $repoUrl"
    # git clone "$repoUrl" "$repoName"
    git clone "$repoUrl"
fi
