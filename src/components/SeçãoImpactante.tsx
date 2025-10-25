"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ======= IMAGENS DO CARROSSEL (ordem: antes → depois → resultado) =======
const imagens = [
  // SEQUÊNCIA 1: ETH
  "/eth'1.webp", // Antes
  "/resultado cripto 1  (1).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg", // Resultado
  
  // SEQUÊNCIA 2: ETH 2
  "/eth2.webp", // Antes
  "/resultado cripto 1  (3).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg", // Resultado
  
  // SEQUÊNCIA 3: Libra
  "/libra1.webp", // Antes
  "/resultado cripto 1  (8).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg", // Resultado
  
  // SEQUÊNCIA 4: Libra 2
  "/libra2.webp", // Antes
  "/resultado cripto 2.jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg", // Resultado
  
  // SEQUÊNCIA 5: USD
  "/usd1.webp", // Antes
  "/resultado forex 1  (6).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg", // Resultado
  
  // SEQUÊNCIA 6: USD 2
  "/usd2.webp", // Antes
  "/resultado forex 2  (2).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg", // Resultado
  
  // SEQUÊNCIA 7: XAU
  "/xau1.webp", // Antes
  "/resultado forex 3  (5).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg", // Resultado
  
  // SEQUÊNCIA 8: XAU 2
  "/xau2.webp", // Antes
  "/resultado forex 4  (7).jpeg", // Depois
  "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg", // Resultado
  
  // SEQUÊNCIA 9: BTC
  "/btc1.webp", // Antes
  "/resultado cripto 1  (2).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (2).jpeg", // Resultado
  
  // SEQUÊNCIA 10: BTC 2
  "/btc2.webp", // Antes
  "/resultado cripto 1  (4).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (3).jpeg", // Resultado
  
  // SEQUÊNCIA 11: BTC 3
  "/btc3.webp", // Antes
  "/resultado cripto 1  (5).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (4).jpeg", // Resultado
  
  // SEQUÊNCIA 12: BTC 4
  "/btc4.webp", // Antes
  "/resultado cripto 1  (6).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (5).jpeg", // Resultado
  
  // SEQUÊNCIA 13: PEPE
  "/pepe1.webp", // Antes
  "/resultado cripto 1  (7).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (6).jpeg", // Resultado
  
  // SEQUÊNCIA 14: PEPE 2
  "/pepe2.webp", // Antes
  "/resultado cripto 1  (9).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (7).jpeg", // Resultado
  
  // SEQUÊNCIA 15: RLC
  "/rlc1.webp", // Antes
  "/resultado cripto 1  (10).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (8).jpeg", // Resultado
  
  // SEQUÊNCIA 16: RLC 2
  "/rlc2.webp", // Antes
  "/resultado cripto 1  (11).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (9).jpeg", // Resultado
  
  // SEQUÊNCIA 17: USDCAD
  "/usdcad1.webp", // Antes
  "/resultado forex 1  (1).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (10).jpeg", // Resultado
  
  // SEQUÊNCIA 18: USDCAD 2
  "/usdcad2.webp", // Antes
  "/resultado forex 1  (2).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (11).jpeg", // Resultado
  
  // SEQUÊNCIA 19: GBPUSD
  "/gbpusd1.webp", // Antes
  "/resultado forex 1  (3).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (12).jpeg", // Resultado
  
  // SEQUÊNCIA 20: GBPUSD 2
  "/gbpusd2.webp", // Antes
  "/resultado forex 1  (4).jpeg", // Depois
  "/WhatsApp Image 2025-10-21 at 17.07.37 (13).jpeg", // Resultado
];

// ======= LEGENDAS DINÂMICAS =======
const getLegenda = (index: number) => {
  const tipo = index % 3;
  switch (tipo) {
    case 0: return { icon: "📉", text: "Antes da Estratégia", color: "text-red-300" };
    case 1: return { icon: "📈", text: "Depois da Estratégia", color: "text-blue-300" };
    case 2: return { icon: "💰", text: "Resultado Real", color: "text-emerald-300" };
    default: return { icon: "📊", text: "Transformação", color: "text-gray-300" };
  }
};

// ======= SEÇÃO IMPACTANTE + CARROSSEL =======
export default function Transformacoes3D() {
  const [index, setIndex] = useState(0);

  // Loop automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 1800); // 1.8 segundos por imagem
    return () => clearInterval(intervalo);
  }, []);

  const legenda = getLegenda(index);

  return (
    <section className="relative flex flex-col items-center justify-center py-24 bg-gradient-to-b from-[#030a07] via-[#04100b] to-[#06140e] overflow-hidden">
      {/* LINHA DOURADA ANIMADA */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-70"
      />

      {/* TEXTO CINEMATOGRÁFICO */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-extrabold text-center leading-tight text-emerald-100 z-10"
      >
        O ponto de virada não está no gráfico —{" "}
        <span className="text-amber-400">está na mente.</span>
        <br />
        <span className="text-emerald-300">E quando ela muda, tudo muda.</span>
      </motion.h2>

      {/* SUBTEXTO */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-slate-400 mt-5 italic text-center text-sm md:text-base z-10"
      >
        Veja o que acontece quando a mentalidade certa encontra a execução real.
      </motion.p>

      {/* CARROSSEL AUTOMÁTICO 3D */}
      <div className="relative w-[90vw] max-w-4xl h-[55vw] sm:h-[420px] md:h-[480px] mt-12 perspective-[1000px]">
        {imagens.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
            animate={{
              opacity: i === index ? 1 : 0,
              rotateY: i === index ? 0 : 60,
              scale: i === index ? 1 : 0.8,
              zIndex: i === index ? 10 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={img}
              alt={`Transformação ${i + 1}`}
              className="w-full h-full rounded-2xl border border-emerald-700 shadow-[0_0_100px_rgba(0,255,150,0.15)] object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* LEGENDA ANIMADA */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full border border-emerald-500/30"
      >
        <span className="text-2xl">{legenda.icon}</span>
        <span className={`text-lg font-semibold ${legenda.color}`}>
          {legenda.text}
        </span>
      </motion.div>

      {/* EFEITO DE BRILHO DE FUNDO */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-[650px] h-[650px] rounded-full bg-emerald-500/10 blur-3xl bottom-10"
      />
    </section>
  );
}
