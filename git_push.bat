@echo off
setlocal ENABLEDELAYEDEXPANSION
title 🚀 Auto Push GitHub - Estratégia TFX Mente

echo ================================
echo 🔁 Sincronizando com o repositório remoto...
echo ================================
git fetch origin main
git pull origin main --rebase
if errorlevel 1 (
  echo ❌ Erro ao sincronizar com o remoto. Resolva conflitos e tente novamente.
  pause
  exit /b 1
)

echo.
echo 🔍 Verificando alterações locais...
git diff --quiet && git diff --staged --quiet
if %errorlevel%==0 (
  echo ⚠️ Nenhuma mudança detectada para commit.
  pause
  exit /b 0
)

echo.
echo ➕ Adicionando arquivos modificados...
git add .

echo.
set /p msg="📝 Digite a mensagem do commit (pressione Enter para usar padrão): "
if "!msg!"=="" set msg=Atualização automática - background cinematográfico e ajustes visuais
git commit -m "!msg!"

echo.
echo ⬆️ Enviando para o GitHub...
git push origin main
if errorlevel 1 (
  echo ❌ Falha no push. Verifique se há conflito ou autenticação incorreta.
  echo 👉 Dica: se pedir senha, use um Token de Acesso Pessoal (PAT).
  pause
  exit /b 1
)

echo.
echo ================================
echo ✅ Push concluído com sucesso!
echo ================================
pause
