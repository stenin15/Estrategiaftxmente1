"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Import todas as imagens do carrossel aqui ↓
// Usando as imagens reais do projeto:
const imagens = [
  "/eth'1.webp",
  "/resultado cripto 1  (1).jpeg", 
  "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg",
  "/eth2.webp",
  "/resultado cripto 1  (3).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg",
  "/libra1.webp",
  "/resultado cripto 1  (8).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg",
  "/libra2.webp",
  "/resultado cripto 2.jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg",
  "/usd1.webp",
  "/resultado forex 1  (6).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg",
  "/usd2.webp",
  "/resultado forex 2  (2).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg",
  "/xau1.webp",
  "/resultado forex 3  (5).jpeg",
  "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg",
  "/xau2.webp",
  "/resultado forex 4  (7).jpeg",
  "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg"
];

// =========================
// SEÇÃO CINEMATOGRÁFICA
// =========================
export default function SeçãoImpactante() {
  const [index, setIndex] = useState(0);

  // Rotação automática das imagens
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 1800); // 1.8 segundos por imagem
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      {/* BLOCO CINEMATOGRÁFICO */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-[#02070a] via-[#050c0a] to-[#040b07] overflow-hidden">
        {/* Linha dourada animada */}
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

        {/* Texto principal */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold text-emerald-100 leading-tight z-10"
        >
          O ponto de virada não está no gráfico —{" "}
          <span className="text-amber-400">está na mente.</span>
          <br />
          <span className="text-emerald-300">E quando ela muda, tudo muda.</span>
        </motion.h2>

        {/* Subtexto */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-slate-400 mt-6 italic text-sm md:text-base z-10"
        >
          Veja o que acontece quando a mentalidade certa encontra a execução real.
        </motion.p>
      </section>

      {/* CARROSSEL AUTOMÁTICO */}
      <section className="relative flex justify-center items-center py-16 bg-[#050b0a] overflow-hidden">
        <div className="relative w-[90vw] max-w-4xl h-[60vw] sm:h-[480px] md:h-[520px] lg:h-[540px]">
          {imagens.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: i === index ? 1 : 0,
                scale: i === index ? 1 : 0.95,
                zIndex: i === index ? 10 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Resultado ${i + 1}`}
                className="w-full h-full rounded-2xl shadow-[0_0_80px_rgba(0,255,150,0.15)] border border-emerald-800 object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Glow visual no fundo */}
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-3xl"
        />
      </section>
    </>
  );
}
