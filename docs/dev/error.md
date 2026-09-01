(base) PS D:\2-Project\creathon> git remote add origin https://github.com/CREATHON-2026/himatik-tim.git
(base) PS D:\2-Project\creathon> git branch -M main
(base) PS D:\2-Project\creathon> git push -u origin main
To https://github.com/CREATHON-2026/himatik-tim.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/CREATHON-2026/himatik-tim.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
(base) PS D:\2-Project\creathon> git push -u origin main --force
>> 
Enumerating objects: 51, done.
Counting objects: 100% (51/51), done.
Delta compression using up to 12 threads
Compressing objects: 100% (47/47), done.
Writing objects: 100% (51/51), 99.76 KiB | 3.33 MiB/s, done.
Total 51 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (6/6), done.
To https://github.com/CREATHON-2026/himatik-tim.git
 + c8fb363...638e0d9 main -> main (forced update)
branch 'main' set up to track 'origin/main'.
(base) PS D:\2-Project\creathon> 