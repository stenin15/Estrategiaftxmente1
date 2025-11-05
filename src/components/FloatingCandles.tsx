import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Componente de Velas Flutuantes Dinâmicas
 * 
 * Cria um efeito visual imersivo de gráfico de trading com velas (candles)
 * flutuando suavemente ao fundo, dando profundidade e movimento ao quiz.
 * 
 * @param count - Número de velas a renderizar (padrão: calculado automaticamente baseado no tamanho da tela)
 * @param speed - Velocidade base das animações (padrão: 1, pode ser ajustado entre 0.5-2)
 */
interface FloatingCandlesProps {
  count?: number;
  speed?: number;
}

interface Candle {
  id: number;
  x: number; // Posição X em porcentagem (0-100)
  height: number; // Altura da vela em pixels
  width: number; // Largura da vela em pixels
  color: "green" | "red"; // Cor da vela (alta ou baixa)
  duration: number; // Duração da animação em segundos
  delay: number; // Delay inicial em segundos
  opacity: number; // Opacidade (0.1-0.25)
  isUp: boolean; // Direção da vela (true = alta/green, false = baixa/red)
}

export function FloatingCandles({ count, speed = 1 }: FloatingCandlesProps) {
  const [candles, setCandles] = useState<Candle[]>([]);

  // Calcular quantidade de velas baseada no tamanho da tela
  const calculateCandleCount = (): number => {
    if (count !== undefined) return count;
    
    if (typeof window === "undefined") return 15;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    
    // Aproximadamente 1 vela para cada 50.000 pixels²
    const baseCount = Math.floor(area / 50000);
    
    // Limitar entre 10 e 30 velas para performance
    return Math.max(10, Math.min(30, baseCount));
  };

  // Gerar array de velas com propriedades aleatórias
  useEffect(() => {
    const candleCount = calculateCandleCount();
    const newCandles: Candle[] = [];

    for (let i = 0; i < candleCount; i++) {
      const isUp = Math.random() > 0.5; // 50% chance de alta ou baixa
      const layer = Math.floor(Math.random() * 3); // 0 = próximo, 1 = médio, 2 = distante
      
      // Propriedades baseadas na camada (paralaxe)
      const layerProps = {
        0: { // Próximo - maiores, mais rápidas, mais opacas
          height: { min: 80, max: 120 },
          width: { min: 8, max: 12 },
          duration: { min: 8, max: 12 },
          opacity: { min: 0.2, max: 0.25 },
        },
        1: { // Médio
          height: { min: 50, max: 80 },
          width: { min: 6, max: 8 },
          duration: { min: 12, max: 18 },
          opacity: { min: 0.15, max: 0.2 },
        },
        2: { // Distante - menores, mais lentas, menos opacas
          height: { min: 30, max: 50 },
          width: { min: 4, max: 6 },
          duration: { min: 18, max: 25 },
          opacity: { min: 0.1, max: 0.15 },
        },
      };

      const props = layerProps[layer as keyof typeof layerProps];

      newCandles.push({
        id: i,
        x: Math.random() * 100, // Posição X aleatória (0-100%)
        height: Math.random() * (props.height.max - props.height.min) + props.height.min,
        width: Math.random() * (props.width.max - props.width.min) + props.width.min,
        color: isUp ? "green" : "red",
        duration: (Math.random() * (props.duration.max - props.duration.min) + props.duration.min) / speed,
        delay: Math.random() * 2, // Delay inicial aleatório (0-2s)
        opacity: Math.random() * (props.opacity.max - props.opacity.min) + props.opacity.min,
        isUp,
      });
    }

    setCandles(newCandles);
  }, [count, speed]);

  // Ajustar quantidade de velas quando a janela é redimensionada
  useEffect(() => {
    const handleResize = () => {
      if (count === undefined) {
        const candleCount = calculateCandleCount();
        // Regenerar apenas se a quantidade mudou significativamente
        if (Math.abs(candleCount - candles.length) > 5) {
          setCandles([]);
          setTimeout(() => {
            const newCandles: Candle[] = [];
            for (let i = 0; i < candleCount; i++) {
              const isUp = Math.random() > 0.5;
              const layer = Math.floor(Math.random() * 3);
              
              const layerProps = {
                0: { height: { min: 80, max: 120 }, width: { min: 8, max: 12 }, duration: { min: 8, max: 12 }, opacity: { min: 0.2, max: 0.25 } },
                1: { height: { min: 50, max: 80 }, width: { min: 6, max: 8 }, duration: { min: 12, max: 18 }, opacity: { min: 0.15, max: 0.2 } },
                2: { height: { min: 30, max: 50 }, width: { min: 4, max: 6 }, duration: { min: 18, max: 25 }, opacity: { min: 0.1, max: 0.15 } },
              };

              const props = layerProps[layer as keyof typeof layerProps];
              newCandles.push({
                id: i,
                x: Math.random() * 100,
                height: Math.random() * (props.height.max - props.height.min) + props.height.min,
                width: Math.random() * (props.width.max - props.width.min) + props.width.min,
                color: isUp ? "green" : "red",
                duration: (Math.random() * (props.duration.max - props.duration.min) + props.duration.min) / speed,
                delay: Math.random() * 2,
                opacity: Math.random() * (props.opacity.max - props.opacity.min) + props.opacity.min,
                isUp,
              });
            }
            setCandles(newCandles);
          }, 100);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count, speed, candles.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          initial={{ 
            y: candle.isUp ? "100vh" : "-20vh", // Velas verdes começam de baixo, vermelhas de cima
            opacity: 0 
          }}
          animate={{
            y: candle.isUp ? "-20vh" : "100vh", // Velas verdes sobem, vermelhas descem
            opacity: candle.opacity,
          }}
          transition={{
            duration: candle.duration,
            delay: candle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${candle.x}%`,
            bottom: candle.isUp ? "auto" : "0",
            top: candle.isUp ? "0" : "auto",
            width: `${candle.width}px`,
            height: `${candle.height}px`,
            borderRadius: "2px",
            backgroundColor: candle.color === "green" ? "#00FF9C" : "#FF4B4B",
            boxShadow: candle.color === "green" 
              ? `0 0 ${candle.width * 2}px rgba(0, 255, 156, ${candle.opacity * 2})`
              : `0 0 ${candle.width * 2}px rgba(255, 75, 75, ${candle.opacity * 2})`,
            filter: `blur(${candle.width * 0.3}px)`,
            opacity: candle.opacity,
          }}
          className="will-change-transform"
        />
      ))}
    </div>
  );
}

