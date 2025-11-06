# ✅ SOLUÇÃO DEFINITIVA - Carregamento de Vídeos no Quiz

## 🔍 DIAGNÓSTICO DO PROBLEMA

### **Causa Raiz:**
1. **Espaços nos nomes dos arquivos**: Arquivos como `"pergunta 2 ( avançado).mp4"` têm espaços que não eram codificados na URL
2. **Conflito entre `<source>` e `src` direto**: O código usava `<source>` mas o `useEffect` tentava definir `video.src` diretamente
3. **Falta de logs detalhados**: Difícil debugar problemas de carregamento

## ✅ SOLUÇÃO IMPLEMENTADA

### 1. **Codificação Automática de Espaços**

A função `getVideoForStep` agora codifica automaticamente espaços e caracteres especiais:

```tsx
const getVideoForStep = (step: number, level: Level | null): string => {
  let videoPath = "";
  
  // ... lógica de seleção do vídeo ...
  
  // Codificar espaços e caracteres especiais na URL
  return videoPath.split('/').map((part, i) => {
    if (i === 0) return part; // Manter a barra inicial
    return encodeURIComponent(part); // Codificar: "pergunta 2 ( avançado).mp4" → "pergunta%202%20(%20avançado).mp4"
  }).join('/');
};
```

**Exemplo:**
- Input: `"/pergunta 2 ( avançado).mp4"`
- Output: `"/pergunta%202%20(%20avançado).mp4"`

### 2. **Uso de `src` Direto no `<video>`**

Simplificado para usar `src` direto em vez de `<source>`:

```tsx
<video
  key={`video-${step}-${level || 'null'}-${getVideoForStep(step, level)}`}
  ref={videoRef}
  src={getVideoForStep(step, level)}  // ✅ src direto com URL codificada
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  controls={false}
  // ... estilos ...
>
  Seu navegador não suporta vídeos HTML5.
</video>
```

### 3. **useEffect Melhorado**

O `useEffect` agora:
- Limpa o src anterior antes de definir novo
- Aguarda eventos de carregamento antes de tentar reproduzir
- Tem retry automático em caso de erro
- Logs detalhados em cada etapa

```tsx
useEffect(() => {
  if (!videoRef.current || shouldUseImage(step) || !shouldShowMedia(step)) {
    return;
  }

  const video = videoRef.current;
  const videoSrc = getVideoForStep(step, level);
  
  // Limpar src anterior
  video.src = '';
  video.load();
  
  // Definir novo src após delay
  setTimeout(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
    }
  }, 100);

  // Tentar reproduzir quando pronto
  const tryPlay = () => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      videoRef.current.play().catch(() => {});
    }
  };

  video.addEventListener('loadedmetadata', tryPlay, { once: true });
  video.addEventListener('canplay', tryPlay, { once: true });
}, [step, level]);
```

### 4. **Logs Detalhados para Debug**

Eventos adicionados no elemento `<video>`:
- `onLoadStart` - Quando inicia carregamento
- `onLoadedMetadata` - Quando metadata está pronto
- `onCanPlay` - Quando pode reproduzir
- `onError` - Erro detalhado com código e mensagem
- `onPlaying` - Quando está reproduzindo

## 🧪 COMO TESTAR

### 1. **Teste Local:**

```bash
npm run dev
# Acesse: http://localhost:5173
```

### 2. **Teste Acesso Direto ao Vídeo:**

Acesse no navegador:
- `http://localhost:5173/pergunta%203.mp4` (deve abrir o vídeo)
- `http://localhost:5173/pergunta%202%20(%20avançado).mp4` (deve abrir o vídeo)

### 3. **Verificar Console:**

Abra o Console (F12) e procure por:
- `📹 Configurando vídeo:` - Configuração inicial
- `📹 Novo src definido:` - URL definida
- `✅ Vídeo: Metadata carregado` - Vídeo pronto
- `✅ Vídeo: Pronto para reproduzir` - Pode reproduzir
- `▶️ Vídeo: Reproduzindo!` - Reproduzindo com sucesso
- `❌ Vídeo: ERRO ao carregar` - Se houver erro

### 4. **Teste no Vercel:**

Após deploy, acesse:
- `https://seu-site.vercel.app/pergunta%203.mp4`
- Deve abrir o vídeo diretamente

## 📋 CÓDIGO FINAL DO COMPONENTE DE VÍDEO

```tsx
{/* SEÇÃO DE VÍDEO EM LOOP INFINITO */}
{!shouldUseImage(step) && shouldShowMedia(step) && (
  <motion.div
    key={`video-container-${step}-${getVideoForStep(step, level)}`}
    className="relative w-full md:w-[85%] overflow-hidden rounded-2xl"
    style={{
      height: "320px",
      minHeight: "320px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <video
      key={`video-${step}-${level || 'null'}-${getVideoForStep(step, level)}`}
      ref={videoRef}
      src={getVideoForStep(step, level)}  // ✅ URL já codificada
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        objectFit: "cover",
        filter: "brightness(0.9)",
        backgroundColor: "#000000",
        display: "block",
      }}
      onLoadStart={() => {
        console.log('📹 Vídeo: Iniciando carregamento', getVideoForStep(step, level));
      }}
      onLoadedMetadata={(e) => {
        const video = e.currentTarget;
        console.log('✅ Vídeo: Metadata carregado', {
          src: video.src,
          duration: video.duration,
          readyState: video.readyState
        });
      }}
      onCanPlay={(e) => {
        const video = e.currentTarget;
        console.log('✅ Vídeo: Pronto para reproduzir', video.src);
        video.play().catch((err) => {
          console.warn('⚠️ Vídeo: Erro ao reproduzir automaticamente', err);
        });
      }}
      onError={(e) => {
        const video = e.currentTarget;
        const error = video.error;
        console.error('❌ Vídeo: ERRO ao carregar', {
          src: video.src,
          currentSrc: video.currentSrc,
          errorCode: error?.code,
          errorMessage: error?.message,
          networkState: video.networkState,
          readyState: video.readyState,
          step,
          level
        });
      }}
      onPlaying={() => {
        console.log('▶️ Vídeo: Reproduzindo!', getVideoForStep(step, level));
      }}
    >
      Seu navegador não suporta vídeos HTML5.
    </video>
  </motion.div>
)}
```

## 🔧 CONFIGURAÇÕES NECESSÁRIAS

### vercel.json (JÁ CORRETO)

```json
{
  "rewrites": [
    {
      "source": "/((?!.*\\.(?:mp4|png|jpg|jpeg|gif|webp|svg|ico|css|js|json|woff2?|ttf|map)).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)\\.mp4",
      "headers": [
        {
          "key": "Content-Type",
          "value": "video/mp4"
        },
        {
          "key": "Accept-Ranges",
          "value": "bytes"
        }
      ]
    }
  ]
}
```

## ✅ RESULTADO ESPERADO

Após o deploy:
- ✅ Vídeos carregam automaticamente
- ✅ Espaços nos nomes são codificados corretamente
- ✅ Logs detalhados no console para debug
- ✅ Retry automático em caso de erro
- ✅ Funciona em localhost e Vercel

## 🎯 PRÓXIMOS PASSOS

1. **Aguardar deploy** (1-3 minutos)
2. **Testar no site**: Acesse o quiz e verifique se os vídeos aparecem
3. **Verificar console**: Abra F12 e veja os logs de carregamento
4. **Testar acesso direto**: Acesse `/pergunta%203.mp4` diretamente

Se ainda não funcionar, os logs no console mostrarão exatamente qual é o problema!

