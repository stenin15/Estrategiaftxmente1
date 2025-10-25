"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Item = {
  tipo: "ANTES" | "DEPOIS" | "RESULTADO";
  src: string;
  alt: string;
  destaqueTexto?: string;
};

const itensDefault: Item[] = [
  // SEQUÊNCIA 1: ETH
  { tipo: "ANTES", src: "/eth'1.webp", alt: "Antes da Estratégia - ETH" },
  { tipo: "DEPOIS", src: "/resultado cripto 1  (1).jpeg", alt: "Depois da Estratégia - ETH" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.07.37 (1).jpeg", alt: "Resultado Final - ETH", destaqueTexto: "+R$ 2.847" },

  // SEQUÊNCIA 2: ETH 2
  { tipo: "ANTES", src: "/eth2.webp", alt: "Antes da Estratégia - ETH 2" },
  { tipo: "DEPOIS", src: "/resultado cripto 1  (3).jpeg", alt: "Depois da Estratégia - ETH 2" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.07.37.jpeg", alt: "Resultado Final - ETH 2", destaqueTexto: "+R$ 1.923" },

  // SEQUÊNCIA 3: Libra
  { tipo: "ANTES", src: "/libra1.webp", alt: "Antes da Estratégia - Libra" },
  { tipo: "DEPOIS", src: "/resultado cripto 1  (8).jpeg", alt: "Depois da Estratégia - Libra" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.07.38 (1).jpeg", alt: "Resultado Final - Libra", destaqueTexto: "+R$ 3.156" },

  // SEQUÊNCIA 4: Libra 2
  { tipo: "ANTES", src: "/libra2.webp", alt: "Antes da Estratégia - Libra 2" },
  { tipo: "DEPOIS", src: "/resultado cripto 2.jpeg", alt: "Depois da Estratégia - Libra 2" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.10.12 (1).jpeg", alt: "Resultado Final - Libra 2", destaqueTexto: "+R$ 2.634" },

  // SEQUÊNCIA 5: USD
  { tipo: "ANTES", src: "/usd1.webp", alt: "Antes da Estratégia - USD" },
  { tipo: "DEPOIS", src: "/resultado forex 1  (6).jpeg", alt: "Depois da Estratégia - USD" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.10.24 (1).jpeg", alt: "Resultado Final - USD", destaqueTexto: "+R$ 4.127" },

  // SEQUÊNCIA 6: USD 2
  { tipo: "ANTES", src: "/usd2.webp", alt: "Antes da Estratégia - USD 2" },
  { tipo: "DEPOIS", src: "/resultado forex 2  (2).jpeg", alt: "Depois da Estratégia - USD 2" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.10.24.jpeg", alt: "Resultado Final - USD 2", destaqueTexto: "+R$ 3.892" },

  // SEQUÊNCIA 7: XAU
  { tipo: "ANTES", src: "/xau1.webp", alt: "Antes da Estratégia - Ouro" },
  { tipo: "DEPOIS", src: "/resultado forex 3  (5).jpeg", alt: "Depois da Estratégia - Ouro" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-21 at 17.10.34.jpeg", alt: "Resultado Final - Ouro", destaqueTexto: "+R$ 5.234" },

  // SEQUÊNCIA 8: XAU 2
  { tipo: "ANTES", src: "/xau2.webp", alt: "Antes da Estratégia - Ouro 2" },
  { tipo: "DEPOIS", src: "/resultado forex 4  (7).jpeg", alt: "Depois da Estratégia - Ouro 2" },
  { tipo: "RESULTADO", src: "/WhatsApp Image 2025-10-22 at 00.13.37.jpeg", alt: "Resultado Final - Ouro 2", destaqueTexto: "+R$ 4.567" },
];

export default function TransformacoesReaisSection({ itens = itensDefault }: { itens?: Item[] }) {
  return (
    <section id="transformacoes-reais" className="relative py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#071018] via-[#071814] to-[#071810]">
      <div className="mx-auto max-w-5xl">
        {/* Header / Intro */}
        <div className="text-center">
          <p className="text-emerald-300 text-sm font-semibold mb-2">SELEÇÃO COMPROVADA</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-200 leading-tight">
            Transformações Reais — direto das telas de quem decidiu mudar o jogo
          </h2>
          <p className="text-slate-400 mt-3 max-w-3xl mx-auto">
            Operações aplicando a Estratégia <b>TFX</b> capturadas de contas reais. Mais do que números — prova de disciplina, método e clareza mental em ação.
          </p>
        </div>

        {/* Bloco verde de destaque (valor ajustado) */}
        <div className="mt-8">
          <div className="relative rounded-2xl border border-emerald-800 bg-[#09221a]/60 p-6 shadow-[0_8px_40px_rgba(0,255,150,0.04)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-emerald-400 font-semibold text-xl">Mais de R$ 35.000 em 14 dias</h3>
                <p className="text-slate-300 mt-1 max-w-xl">
                  Lucros gerados por alunos aplicando o método <strong>TFX Mente</strong>. Dados reais de corretora — disciplina, método e execução clara.
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <a
                  href="#quero-tfx"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-400/95 text-slate-900 px-4 py-2 text-sm font-semibold shadow hover:brightness-95 transition"
                >
                  Quero aplicar a Estratégia TFX agora
                </a>

                <a
                  href="#ver-casos"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-700 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-800/20 transition"
                >
                  Ver métodos completos →
                </a>
              </div>
            </div>

            {/* bullets */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="text-sm text-slate-300">
                • Leitura de Fluxo — ver o que o mercado realmente fez antes de entrar. <br />
                • Timing Perfeito — entrar com precisão quando a oportunidade aparece.
              </div>
              <div className="text-sm text-slate-300">
                • Gestão Inteligente — proteger ganhos e multiplicar com disciplina. <br />
                • Mindset de Consistência — quando tudo se alinha, o resultado se torna previsível.
              </div>
            </div>
          </div>
        </div>

        {/* CARROSSEL 3D - SUBSTITUI O GRID */}
        <div className="mt-12">
          <TransformacoesCarousel3D itens={itens} />
        </div>

        <div className="mt-8 text-center text-slate-400 italic">
          <p>Prova real de disciplina, método e clareza mental em ação — arraste para ver cada caso: Antes → Depois → Resultado.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   COMPONENT: TransformacoesCarousel3D
   ========================= */

function TransformacoesCarousel3D({ itens }: { itens: Item[] }) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 px-2 py-6 perspective-[1400px]">
        {itens.map((item, i) => (
          <Card3D key={i} item={item} index={i} />
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-3">Arraste para o lado • Antes → Depois → Resultado</p>
    </div>
  );
}

function Card3D({ item, index }: { item: Item; index: number }) {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-150, 0, 150], [-12, 0, 12]);
  const badgeColor =
    item.tipo === "ANTES"
      ? "bg-red-600/10 text-red-300 border-red-500/30"
      : item.tipo === "DEPOIS"
      ? "bg-blue-600/10 text-blue-300 border-blue-500/30"
      : "bg-amber-500/10 text-amber-300 border-amber-400/30";

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ rotateY }}
      onDrag={(_, info) => x.set(info.offset.x)}
      onDragEnd={() => x.set(0)}
      className="snap-center shrink-0 w-[88vw] sm:w-[560px] bg-[#0b1720]/70 border border-[#1f2b34] rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden [transform-style:preserve-3d]"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className={`text-[12px] px-3 py-1 rounded-full border ${badgeColor} font-medium`}>
          {item.tipo === "RESULTADO" ? "Resultado Final" : item.tipo === "ANTES" ? "Antes da Estratégia" : "Depois da Estratégia"}
        </span>

        {item.destaqueTexto ? (
          <span className="text-[12px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
            {item.destaqueTexto}
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">TFX Mente</span>
        )}
      </div>

      <div className="px-4 pb-4">
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
