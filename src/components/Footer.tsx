export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Coluna 1 */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">💠 Estratégia TFX Mente</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Método avançado criado para transformar traders comuns em profissionais consistentes.
            Operações baseadas em setups validados, backtests reais e mentalidade de longo prazo.
          </p>
          <p className="text-xs mt-3 text-gray-500">© 2025 Estratégia TFX Mente. Todos os direitos reservados.</p>
        </div>

        {/* Coluna 2 */}
        <div>
          <h4 className="text-white font-semibold mb-3">📚 Links Rápidos</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#faq" className="hover:text-white transition">Perguntas Frequentes</a></li>
            <li><a href="#resultados" className="hover:text-white transition">Resultados e Backtests</a></li>
            <li><a href="#garantia" className="hover:text-white transition">Garantia e Reembolso</a></li>
            <li><a href="#contato" className="hover:text-white transition">Fale Conosco</a></li>
          </ul>
        </div>

        {/* Coluna 3 */}
        <div>
          <h4 className="text-white font-semibold mb-3">🛡️ Segurança e Transparência</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>🔒 SSL Ativo — conexão criptografada</li>
            <li>💳 Pagamento 100% Seguro</li>
            <li>✅ 7 dias de garantia total</li>
          </ul>
        </div>


      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
        <p>Desenvolvido com precisão para traders que buscam <span className="text-white font-semibold">liberdade e consistência</span>.</p>
        <p className="mt-1">Este site não garante resultados financeiros. Operar no mercado envolve riscos. Invista com responsabilidade.</p>
      </div>
    </footer>
  );
};