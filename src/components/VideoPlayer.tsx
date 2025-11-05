import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  step: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function VideoPlayer({ 
  src, 
  step, 
  autoPlay = true, 
  loop = true, 
  muted = true 
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('🎬 VideoPlayer: Inicializando', { src, step });

    // Limpar src anterior
    video.src = '';
    video.load();

    // Aguardar um momento antes de definir novo src
    const timer = setTimeout(() => {
      if (video && videoRef.current) {
        // Criar URL absoluta para garantir que funcione
        const videoSrc = src.startsWith('/') ? src : `/${src}`;
        const fullUrl = window.location.origin + videoSrc;
        
        console.log('🎬 VideoPlayer: Definindo src', { videoSrc, fullUrl });
        
        videoRef.current.src = videoSrc;
        videoRef.current.load();
        
        // Tentar reproduzir após carregar
        const playTimer = setTimeout(() => {
          if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('✅ VideoPlayer: Vídeo reproduzindo!', videoRef.current?.src);
                })
                .catch((error) => {
                  console.error('❌ VideoPlayer: Erro ao reproduzir', error);
                });
            }
          }
        }, 500);

        return () => clearTimeout(playTimer);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [src, step]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
      }}
    >
      <video
        ref={videoRef}
        key={`video-player-${step}-${src}`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
        controls={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          objectFit: "cover",
          filter: "brightness(0.9)",
          backgroundColor: "#000000",
          display: "block",
        }}
        onLoadStart={() => {
          console.log('📹 VideoPlayer: onLoadStart', videoRef.current?.src);
        }}
        onLoadedMetadata={() => {
          console.log('✅ VideoPlayer: onLoadedMetadata', videoRef.current?.src);
          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
              console.error('⚠️ VideoPlayer: Erro no play', err);
            });
          }
        }}
        onCanPlay={() => {
          console.log('✅ VideoPlayer: onCanPlay', videoRef.current?.src);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onError={(e) => {
          const video = e.currentTarget;
          console.error('❌ VideoPlayer: ERRO', {
            src: video.src,
            currentSrc: video.currentSrc,
            error: video.error,
            networkState: video.networkState,
            readyState: video.readyState,
          });
        }}
      >
        <source src={src} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
  );
}

