import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

export const ModulesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const modules = [
    {
      title: "DOMÍNIO EMOCIONAL",
      subtitle: "MENTE & MERCADO",
      description: "Equilíbrio mental e controle absoluto sobre ansiedade e impulsos — opere com clareza mesmo sob pressão extrema",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      badge: "ESSENCIAL"
    },
    {
      title: "ESTRATÉGIA SMC AVANÇADA",
      subtitle: "MENTE & MERCADO",
      description: "Decodifique a liquidez institucional — Order Blocks, POIs, Chochs, estrutura de mercado e marcações avançadas para Forex",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      badge: "ESSENCIAL"
    },
    {
      title: "EXECUÇÃO PROFISSIONAL",
      subtitle: "MENTE & MERCADO",
      description: "Transforme disciplina em automático com métricas inteligentes e checklists — cada trade vira progresso mensurável",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      badge: "ESSENCIAL"
    }
  ];

  const nextModule = () => {
    setCurrentIndex((prev) => (prev + 1) % modules.length);
  };

  const prevModule = () => {
    setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Veja tudo o que você vai aprender dentro do <span className="text-primary">Guia Mente & Mercado™</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Conteúdo direto, prático e aplicável — criado para quem quer resultados reais
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {modules.map((module, index) => {
                const isCenter = index === currentIndex;
                const isLeft = index === (currentIndex - 1 + modules.length) % modules.length;
                const isRight = index === (currentIndex + 1) % modules.length;
                
                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-out ${
                      isCenter 
                        ? 'scale-100 opacity-100 z-20' 
                        : isLeft || isRight
                        ? 'scale-90 opacity-60 z-10 hover:scale-95 hover:opacity-80'
                        : 'scale-75 opacity-30 z-5'
                    }`}
                  >
                    <Card className={`relative overflow-hidden h-[400px] w-[300px] group bg-card border-2 ${
                      isCenter 
                        ? 'border-primary shadow-[0_0_40px_rgba(0,188,212,0.5)]' 
                        : 'border-primary/30 shadow-[0_0_20px_rgba(0,188,212,0.2)]'
                    } hover:border-primary hover:shadow-[0_0_30px_rgba(0,188,212,0.3)] transition-all duration-500`}>
                      
                      <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/50 shadow-[0_0_15px_rgba(0,188,212,0.4)] z-10">
                        <span className="text-xs font-bold text-primary-foreground">{module.badge}</span>
                      </div>

                      <div className="relative h-full">
                        <img 
                          src={module.image} 
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-urgent/20" />
                        
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <div className="bg-background/95 backdrop-blur-md rounded-xl p-4 border border-primary/30 shadow-[0_0_25px_rgba(0,188,212,0.3)]">
                            <h3 className="text-lg font-bold text-primary mb-2">{module.title}</h3>
                            <p className="text-sm text-primary/80 font-semibold mb-3">{module.subtitle}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{module.description}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button 
                onClick={prevModule}
                className="bg-primary/20 hover:bg-primary/40 backdrop-blur-sm border border-primary/50 rounded-full p-3 transition-all hover:scale-110"
              >
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextModule}
                className="bg-primary/20 hover:bg-primary/40 backdrop-blur-sm border border-primary/50 rounded-full p-3 transition-all hover:scale-110"
              >
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};