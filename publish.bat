@echo off
echo ===== ZAKY publish to GitHub =====
set /p REPO=Paste repo link and press Enter: 
git init
git add .
git commit -m "ZAKY site"
git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO%
git push -u origin main
echo.
echo Finished.
pause
