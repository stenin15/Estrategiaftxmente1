import { Button } from "@/components/ui/button";

export const FormSection = () => {
  return (
    <section id="form" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Acesso Imediato</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Preencha o formulário e tenha acesso ao método completo
          </p>
        </div>

        <div className="bg-card border border-primary/20 rounded-xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,188,212,0.2)]">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 border border-primary/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <h3 className="font-bold text-primary mb-2">🎁 BÔNUS INCLUSOS:</h3>
              <ul className="text-sm space-y-1">
                <li>• Guia Completo Mente & Mercado™</li>
                <li>• Checklist de Execução Profissional</li>
                <li>• Planilha de Controle de Risco</li>
                <li>• Suporte VIP por 30 dias</li>
              </ul>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary mt-4">
                POR APENAS R$ 59,90
              </p>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              variant="urgent" 
              className="w-full text-sm sm:text-base md:text-lg lg:text-xl py-6 sm:py-8 md:py-10 shadow-[0_0_40px_rgba(255,165,0,0.8)] hover:shadow-[0_0_60px_rgba(255,165,0,1)] hover:scale-105 transition-all duration-500 font-black tracking-wide border-2 border-urgent/60 hover:border-urgent"
            >
              🚀 SIM, QUERO DESBLOQUEAR MINHA MENTE AGORA!
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};