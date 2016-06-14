reposDir=repos
bookRepoUrl=$1
bookName=$2

mkdir -p $reposDir && cd $reposDir  

if [ -d $bookName ]
then
    cd $bookName && git pull
else
    git clone $bookRepoUrl $bookName
fi


