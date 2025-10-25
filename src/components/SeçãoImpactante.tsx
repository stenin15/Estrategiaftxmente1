"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// =============================
//  IMAGENS EM ORDEM: ANTES → DEPOIS → RESULTADO
// =============================
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
];

// =============================
// SEÇÃO CINEMATOGRÁFICA + CARROSSEL
// =============================
export default function SeçãoImpactante() {
  const [index, setIndex] = useState(0);

  // Avanço automático do carrossel
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 1800); // 1.8 segundos por imagem
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center py-20 bg-gradient-to-b from-[#030a07] via-[#05100c] to-[#07120c] overflow-hidden">
      {/* LINHA DOURADA PULSANTE */}
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

      {/* FRASE IMPACTANTE */}
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

      {/* CARROSSEL AUTOMÁTICO */}
      <div className="relative w-[90vw] max-w-4xl h-[55vw] sm:h-[420px] md:h-[500px] mt-12">
        {imagens.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 0.95,
              zIndex: i === index ? 10 : 0,
            }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
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

      {/* BRILHO SUAVE DE FUNDO */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl bottom-10"
      />
    </section>
  );
}
