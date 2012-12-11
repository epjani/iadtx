iadtx
=====

IADTx network

CONTRIBUTORS
=====

adinh85
epjani


GIT USAGE
=====

First pull

git clone git@github.com:epjani/iadtx.git
(this will create directory called iadtx on your current location, initialize git and pull copy od latest code on origin repository)
alternate: git clone https://github.com/epjani/iadtx.git


Commit your changes

git status
This will show all your changes that are tracked or untracked

git add .
This will add all your changes to tracking files...

git commit -m "name of commit"


Remove your changes (checkout)

git status
This will show you all your changes that are tracked or untracked

git checkout .
This will remove all your untracked changes. You can be more specific by "git checkout 'path_to_file'"


Pull latest code

git pull

If you want to pull latest code you'll need to have your local repo clean, so commit or checkout (remove) your local changes before you pull.


Push your code

git push
This will push all your commits to origin repo. To do this you need to have latest code from origin repo (git pull).


Conflicts

After pulling code from git some conflicts will probably occur because we work with same files. After pulling code there is a list of new files, changed files and deleted files that you pulled.
Where is a conflict it wil be labeled CONFLICT. Open that file and resolve conflict manually. That file that is resolved will be untracked. Add it to tracked files via git add .
And then just say git commit (without -m). That commit will be automaticly named etc "Merge timestamp".


Have fun!
