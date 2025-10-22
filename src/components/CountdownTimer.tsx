import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Data alvo: 2 horas a partir de agora
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-urgent border-b-2 border-primary shadow-[0_0_20px_rgba(0,188,212,0.5)] py-3 px-4 fixed top-0 left-0 right-0 z-[9999]">
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <span className="text-sm sm:text-base font-bold text-white animate-pulse">⚡ OFERTA EXPIRA EM:</span>
        <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white">
          {timeLeft.days > 0 && (
            <>
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.days).padStart(2, '0')}D</span>
              <span>:</span>
            </>
          )}
          <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}H</span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}M</span>
          <span>:</span>
          <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}S</span>
        </div>
      </div>
    </div>
  );
};