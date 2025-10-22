# 🎨 CSS PARA BACKGROUND CINEMATOGRÁFICO

## 📁 **Após gerar a imagem, salve como:**
```
public/bg-ftx-mente.webp
```

## 🔧 **CSS Atualizado (substitua o atual):**

```css
/* Estilos globais do body */
body {
  background: radial-gradient(circle at 50% 25%, #041420 0%, #000 80%);
  background-attachment: fixed;
  overflow-x: hidden;
}

/* Estilos da seção Hero com background cinematográfico */
.hero {
  background: url("/bg-ftx-mente.webp") no-repeat center center/cover;
  position: relative;
}

/* Overlay sutil para manter legibilidade */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4); /* Ajuste a opacidade conforme necessário */
  z-index: 1;
}

/* Mantém o conteúdo visível */
.hero * {
  position: relative;
  z-index: 2;
}

/* EFEITO LEVE DE BRILHO NO TÍTULO */
.hero h1, .hero h2 {
  text-shadow: 0 0 25px rgba(0, 255, 255, 0.25);
}
```

## 🎯 **Versão com Animação Sutil (Opcional):**

```css
/* Estilos da seção Hero com animação */
.hero {
  background: url("/bg-ftx-mente.webp") no-repeat center center/cover;
  position: relative;
  animation: heroGlow 8s ease-in-out infinite;
}

@keyframes heroGlow {
  0%, 100% {
    filter: brightness(1) contrast(1);
  }
  50% {
    filter: brightness(1.1) contrast(1.05);
  }
}

/* Overlay com gradiente sutil */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 255, 255, 0.05) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
}
```

## 📋 **Checklist de Implementação:**

- [ ] Gerar imagem com prompt fornecido
- [ ] Salvar como `bg-ftx-mente.webp` em `public/`
- [ ] Substituir CSS atual pelo novo
- [ ] Testar legibilidade do texto
- [ ] Ajustar opacidade do overlay se necessário
- [ ] Fazer commit das alterações
- [ ] Testar em produção

## 🎨 **Dicas de Ajuste:**

### **Se o texto ficar difícil de ler:**
```css
.hero::before {
  background: rgba(0, 0, 0, 0.6); /* Aumentar opacidade */
}
```

### **Se quiser mais energia:**
```css
.hero::before {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 255, 255, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
}
```

### **Para efeito mais sutil:**
```css
.hero::before {
  background: rgba(0, 0, 0, 0.3);
}
```

