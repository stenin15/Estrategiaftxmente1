@echo off
echo Fazendo push das alterações para o GitHub...
git add .
git commit -m "Layout limpo - seções complexas removidas - configuração Vercel corrigida"
git push origin main
echo Push concluído!
pause
