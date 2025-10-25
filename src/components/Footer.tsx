export const Footer = () => {
  return (
    <footer className="bg-[#020202] border-t border-cyan-500/20 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">

        {/* COLUNA 1 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">🚀 Estratégia TFX Mente</h3>
          <p className="text-sm leading-relaxed">
            Método criado para transformar traders comuns em operadores conscientes e lucrativos.
            Resultados reais, setups replicáveis e mentalidade de elite — sem depender da sorte.
          </p>
        </div>

        {/* COLUNA 2 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">🔗 Links úteis</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Início</a></li>
            <li><a href="#beneficios" className="hover:text-cyan-400 transition-colors">Benefícios</a></li>
            <li><a href="#resultados" className="hover:text-cyan-400 transition-colors">Resultados Reais</a></li>
            <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Perguntas Frequentes</a></li>
            <li><a href="mailto:suporte@tfxmente.com" className="hover:text-cyan-400 transition-colors">Suporte</a></li>
          </ul>
        </div>

        {/* COLUNA 3 */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">📊 Metodologia Comprovada</h3>
          <div className="space-y-2 text-sm">
            <p className="text-cyan-400 font-semibold">✓ Desenvolvido desde 2023</p>
            <p className="text-gray-300">+500 horas de estudos e análise</p>
            <p className="text-gray-300">+2.000 backtests realizados</p>
            <p className="text-gray-300">+50.000 operações analisadas</p>
            <p className="text-gray-300">Baseado em dados reais do mercado</p>
          </div>
        </div>
      </div>

      {/* LINHA FINAL */}
      <div className="border-t border-cyan-500/10 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2025 <span className="text-cyan-400 font-semibold">Estratégia TFX Mente</span> — Todos os direitos reservados.<br />
        Desenvolvido com 💙 para traders que buscam liberdade.
      </div>
    </footer>
  );
};