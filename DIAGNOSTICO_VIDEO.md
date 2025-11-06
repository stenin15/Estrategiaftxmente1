# 🔍 DIAGNÓSTICO: Por que os vídeos não aparecem

## 📋 PROBLEMAS IDENTIFICADOS

### 1. **Caminho dos Vídeos**
- Arquivos em `/public/` devem ser acessados como `/video.mp4` (não `./public/video.mp4`)
- Vite copia `/public/` → `/dist/` na raiz
- Caminho atual no código: `"/pergunta 3.mp4"` ✅ CORRETO

### 2. **Espaços nos Nomes de Arquivo**
- Arquivos como `"pergunta 2 ( avançado).mp4"` têm espaços
- Navegador precisa de URL encoding (`%20` para espaço)
- O código atual NÃO está codificando os espaços

### 3. **Tag `<source>` vs `src` direto**
- Código atual usa `<source>` dentro de `<video>` ✅ CORRETO
- Mas pode ter problema com espaços no nome

### 4. **useEffect de Carregamento**
- O useEffect tenta definir `video.src` diretamente
- Mas o `<video>` usa `<source>`, então pode haver conflito

## ✅ SOLUÇÃO DEFINITIVA

1. **Codificar espaços nos caminhos**
2. **Usar `src` direto no `<video>` (mais simples)**
3. **Adicionar fallback para imagem se vídeo falhar**
4. **Melhorar logs de debug**

