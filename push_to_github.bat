@echo off
set "PATH=C:\Users\Workstation\AppData\Local\Programs\Git\cmd;%PATH%"
cd /d "d:\web"
echo ==============================================
echo Pushing El Hana Project to GitHub...
echo Repository: https://github.com/ahmedyasser1234/elhana.git
echo Branch: main
echo ==============================================
git push -u origin main
pause
