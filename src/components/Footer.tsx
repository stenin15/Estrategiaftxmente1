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
          <h3 className="text-white font-bold text-lg mb-3">🔒 Pagamento 100% Seguro</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <div className="h-6 w-8 bg-gray-600 rounded opacity-80 flex items-center justify-center text-xs">PIX</div>
            <div className="h-6 w-8 bg-blue-600 rounded opacity-80 flex items-center justify-center text-xs">V</div>
            <div className="h-6 w-8 bg-red-600 rounded opacity-80 flex items-center justify-center text-xs">MC</div>
            <div className="h-6 w-6 bg-green-600 rounded opacity-80 flex items-center justify-center text-xs">🔒</div>
          </div>
          <p className="text-sm mt-3">
            Ambiente criptografado com tecnologia SSL. Seus dados estão protegidos.
          </p>
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