import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const RealResultsSection = () => {
  const results = [
    // GRANDES LUCROS - "Lucrar o Triplo"
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.07.37%20(1).jpeg",
      profit: "+211.58%",
      pair: "MOODENGUSDT",
      type: "Long",
      volume: "0.1",
      entry: "0.0729976",
      exit: "0.0812194",
      date: "2025.09.22",
      description: "Trade executado com disciplina mental - entrada no pullback, saída no alvo",
      isProfit: true,
      category: "GRANDE LUCRO"
    },
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.07.37.jpeg",
      profit: "+66.96%",
      pair: "MYXUSDT",
      type: "Short",
      volume: "0.1",
      entry: "16.368",
      exit: "15.81569",
      date: "2025.09.22",
      description: "Short estratégico após identificação de estrutura de mercado",
      isProfit: true,
      category: "LUCRO EXPRESSIVO"
    },
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.07.38%20(1).jpeg",
      profit: "+38.44%",
      pair: "AEVOUSDT",
      type: "Long",
      volume: "0.05",
      entry: "0.09987",
      exit: "0.10115",
      date: "2025.09.22",
      description: "Long com alavancagem controlada e gestão de risco",
      isProfit: true,
      category: "LUCRO CONSISTENTE"
    },
    // PERDAS CONTROLADAS - "Perder Pouco"
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.10.24%20(1).jpeg",
      profit: "-5.20%",
      pair: "EURUSD",
      type: "Long",
      volume: "0.5",
      entry: "1.17403",
      exit: "1.17342",
      date: "2025.09.22",
      description: "Stop loss respeitado - perda controlada conforme planejado",
      isProfit: false,
      category: "PERDA CONTROLADA"
    },
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.10.24.jpeg",
      profit: "-3.50%",
      pair: "XAUUSD",
      type: "Short",
      volume: "0.1",
      entry: "3690.36",
      exit: "3692.86",
      date: "2025.09.22",
      description: "Stop loss executado - risco limitado conforme estratégia",
      isProfit: false,
      category: "RISCO GERENCIADO"
    },
    // OUTRO GRANDE LUCRO
    {
      image: "https://raw.githubusercontent.com/stenin15/Estrategiaftxmente1/main/src/assets/WhatsApp%20Image%202025-10-21%20at%2017.10.34.jpeg",
      profit: "+168.45%",
      pair: "XAUUSD",
      type: "Long",
      volume: "0.05",
      entry: "3687.11",
      exit: "3720.80",
      date: "2025.09.22",
      description: "Long no ouro - entrada na zona de demanda, saída no alvo",
      isProfit: true,
      category: "GRANDE LUCRO"
    }
  ];

  return (
    <section id="resultados" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-primary drop-shadow-[0_0_10px_rgba(0,188,212,0.5)]">Movimentações Reais</span>{" "}
            <span className="text-urgent">de Mercado</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Veja como nossos alunos transformam <span className="font-bold text-urgent">caos em lucidez</span> através do 
            <span className="font-bold text-primary"> Método Mente & Mercado™</span>
          </p>
          
          {/* Estatísticas de Transparência */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">+211%</div>
              <div className="text-sm text-muted-foreground">Maior Lucro</div>
            </div>
            <div className="bg-urgent/10 border border-urgent/30 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold text-urgent mb-1">-5%</div>
              <div className="text-sm text-muted-foreground">Maior Perda</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">42:1</div>
              <div className="text-sm text-muted-foreground">Relação R:R</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {results.map((result, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className={`relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500 border-2 ${
                  result.isProfit 
                    ? 'border-primary/30 hover:border-primary hover:shadow-[0_0_50px_rgba(0,188,212,0.6)]' 
                    : 'border-red-500/30 hover:border-red-500 hover:shadow-[0_0_50px_rgba(255,0,0,0.6)]'
                } hover:shadow-2xl`}>
                  
                  <div className="relative">
                    <img
                      src={result.image}
                      alt={`Trade ${result.pair} - ${result.profit}`}
                      className="w-full h-[350px] sm:h-[400px] object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                    
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                    
                    {/* Efeito de brilho */}
                    <div className={`absolute inset-0 ${
                      result.isProfit 
                        ? 'bg-gradient-to-br from-primary/20 via-transparent to-urgent/20' 
                        : 'bg-gradient-to-br from-red-500/20 via-transparent to-red-600/20'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Badge de categoria */}
                    <div className={`absolute top-4 right-4 ${
                      result.isProfit 
                        ? 'bg-urgent/90 border-urgent/50 shadow-[0_0_20px_rgba(255,165,0,0.5)]' 
                        : 'bg-red-600/90 border-red-700/50 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
                    } backdrop-blur-sm rounded-full px-3 py-1 border`}>
                      <span className="text-xs font-bold text-white">
                        {result.category}
                      </span>
                    </div>
                    
                    {/* Badge de tipo de trade */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 border border-primary/30">
                      <span className="text-xs font-bold text-primary">
                        {result.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Informações do trade */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <div className={`${
                        result.isProfit 
                          ? 'bg-primary/95 border-primary/50 shadow-[0_0_30px_rgba(0,188,212,0.4)]' 
                          : 'bg-red-600/95 border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.4)]'
                      } backdrop-blur-md rounded-xl px-4 py-3 mb-3 border`}>
                        
                        <p className={`text-2xl sm:text-3xl font-black text-center mb-2 ${
                          result.isProfit ? 'text-primary-foreground' : 'text-red-100'
                        }`}>
                          {result.profit}
                        </p>
                        
                        <p className="text-sm text-center font-semibold mb-2 text-white/90">
                          {result.pair}
                        </p>
                        
                        <div className="text-xs text-center text-white/70 space-y-1">
                          <p>Volume: {result.volume} | {result.type}</p>
                          <p>Entrada: {result.entry} → Saída: {result.exit}</p>
                          <p>{result.date}</p>
                        </div>
                      </div>
                      
                      {/* Descrição do trade */}
                      <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 mb-3 border border-primary/20">
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                      
                      {/* Indicador de status */}
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 ${
                          result.isProfit ? 'bg-green-500' : 'bg-red-500'
                        } rounded-full animate-pulse`} />
                        <span className={`text-xs font-bold ${
                          result.isProfit ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {result.isProfit ? 'TRADE VITORIOSO' : 'RISCO CONTROLADO'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <div className="relative">
                  <img 
                    src={result.image} 
                    alt={`Trade ${result.pair} - ${result.profit} - Visualização completa`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white mb-2">{result.profit}</p>
                      <p className="text-xl text-white/90 mb-2">{result.pair}</p>
                      <p className="text-sm text-white/70">{result.description}</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Seção de Transparência */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-urgent/10 to-primary/10 rounded-2xl p-8 border border-primary/30">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-primary">Transparência Total</span> - Sem Mágica, Apenas Método
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Mostramos <span className="font-bold text-urgent">todos os resultados</span> - lucros e perdas. 
              A diferença está na <span className="font-bold text-primary">disciplina mental</span> para 
              <span className="font-bold text-urgent"> perder pouco e lucrar muito</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-lg font-bold text-green-500 mb-1">Lucros Expressivos</div>
                <div className="text-sm text-muted-foreground">+211%, +168%, +66%</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="text-lg font-bold text-red-500 mb-1">Perdas Controladas</div>
                <div className="text-sm text-muted-foreground">-5%, -3% (Stop Loss)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};