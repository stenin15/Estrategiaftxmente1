"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

type Item = {
  tipo: "ANTES" | "DEPOIS" | "RESULTADO";
  src: string;           // URL da imagem
  alt: string;
  lucro?: string;         // valor do lucro para resultados
};

export default function TransformacoesCarousel3D({
  itens
}: { itens: Item[] }) {
  // carrossel horizontal com snap + 3D tilt
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-5xl">
        <div
          className="
            overflow-x-auto no-scrollbar snap-x snap-mandatory
            flex gap-6 px-2 py-4
            perspective-[1400px]
          "
        >
          {itens.map((item, i) => (
            <Card3D key={i} item={item} index={i} />
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          Arraste para o lado • Antes → Depois → Resultado
        </p>
      </div>
    </section>
  );
}

function Card3D({ item, index }: { item: Item; index: number }) {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-150, 0, 150], [-12, 0, 12]);

  const badgeColor =
    item.tipo === "ANTES"
      ? "bg-red-500/15 text-red-300 border-red-400/30"
      : item.tipo === "DEPOIS"
      ? "bg-blue-500/15 text-blue-300 border-blue-400/30"
      : "bg-amber-500/15 text-amber-300 border-amber-400/30";

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ rotateY }}
      onDrag={(_, info) => x.set(info.offset.x)}
      onDragEnd={() => x.set(0)}
      className="
        snap-center shrink-0 w-[85vw] sm:w-[520px]
        bg-[#0f1722]/70 border border-[#233042] rounded-2xl
        shadow-[0_0_50px_rgba(0,255,150,0.07)]
        backdrop-blur-md overflow-hidden
        [transform-style:preserve-3d]
      "
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className={`text-[11px] px-2.5 py-1 rounded-full border ${badgeColor}`}>
          {item.tipo === "RESULTADO" ? "Resultado Final" : item.tipo === "ANTES" ? "Antes da Estratégia" : "Depois da Estratégia"}
        </span>
        <div className="flex items-center gap-2">
          {item.lucro && (
            <span className="text-[11px] px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-300 border-emerald-400/30">
              {item.lucro}
            </span>
          )}
          <span className="text-[10px] text-gray-400">TFX Mente</span>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden ring-1 ring-white/5">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
