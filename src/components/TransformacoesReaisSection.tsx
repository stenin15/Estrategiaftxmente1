import React from "react";

export default function TransformacoesReaisSection() {
  return (
    <section
      id="transformacoes-reais"
      className="relative py-16 bg-gradient-to-b from-[#06140e] via-[#071612] to-[#091a14]"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-200">
          Transformações Reais — direto das telas de quem decidiu mudar o jogo
        </h2>

        <p className="text-slate-400 mt-3 max-w-3xl">
          Operações aplicando a <b>Estratégia TFX</b> em diferentes mercados.
          Mais do que números — prova de disciplina, método e clareza mental em ação.
        </p>

        {/* BLOCO DE RESULTADOS */}
        <div className="bg-[#0f1a12]/60 border border-emerald-800 rounded-xl p-6 mt-8 shadow-[0_0_25px_rgba(0,255,150,0.1)]">
          <h4 className="text-emerald-400 font-semibold text-lg mb-2">
            Mais de R$ 35.000 em 14 dias
          </h4>
          <p className="text-slate-300 mb-4">
            Resultados obtidos aplicando o método <b>Estratégia TFX</b>. 
            Disciplina, método e clareza emocional em ação.
          </p>

          <ul className="text-slate-400 text-sm space-y-2">
            <li>✅ Leituras de fluxo — ver o mercado antes dos outros.</li>
            <li>✅ Timing perfeito — entrar com precisão quando a oportunidade aparece.</li>
            <li>✅ Gestão inteligente — proteger ganhos e multiplicar com calma.</li>
            <li>✅ Análise de confiança — quando tudo se alinha, o resultado vem.</li>
          </ul>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a
              href="#"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-2 rounded-lg transition-all"
            >
              Quero aplicar a Estratégia TFX agora
            </a>
            <a
              href="#"
              className="border border-emerald-400 text-emerald-300 font-semibold px-6 py-2 rounded-lg hover:bg-emerald-500/10 transition-all"
            >
              Ver método completo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
