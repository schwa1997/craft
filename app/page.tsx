"use client";
import { useEffect, useState } from "react";

export default function ENFPLanding() {
  const [balls, setBalls] = useState<{ top: number; left: number; size: number; duration: number; delay: number }[]>([]);
  const [elements, setElements] = useState<
    { src: string; top: number; left: number; size: number; rotate: number; duration: number; delay: number }[]
  >([]);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    // ENFP 风格随机句子
    const quotes = [
      "人生是旷野，每一步都值得探索 🌿",
      "Shoot for the moon, if you land you land on the cloud ✨"
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);

    // 随机漂浮小圆球
    const newBalls = Array.from({ length: 12 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 20 + 20, // 20~40px
      duration: Math.random() * 6 + 4, // 4~10s
      delay: Math.random() * 2,
    }));
    setBalls(newBalls);

    // Y2K 元素
    const y2kImgs = [
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/696/small/cute-purple-heart-shape-y2k-3d-kpop-png.png",
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/768/small/crescent-moon-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/previews/049/795/819/non_2x/rabbit-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/previews/049/795/812/non_2x/ufo-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/713/small/cute-rabbit-y2k-3d-kpop-png.png",
      "https://static.vecteezy.com/system/resources/previews/027/310/120/non_2x/heart-in-rings-y2k-element-with-pastel-hologram-holographic-chrome-3d-effect-png.png"
    ];

    const newElements = y2kImgs.map((src) => ({
      src,
      top: Math.random() * 70 + 10,
      left: Math.random() * 70 + 10,
      size: Math.random() * 60 + 40, // 40~100px
      rotate: Math.random() * 60 - 30,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setElements(newElements);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden flex items-center justify-center">
      {/* 随机句子 */}
      <h1 className="text-3xl md:text-5xl font-bold text-purple-700 text-center animate-pulse px-4">
        {quote}
      </h1>

      {/* Floating circles */}
      {balls.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-pink-300/40"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animation: `float ${b.duration}s ease-in-out ${b.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Y2K elements */}
      {elements.map((el, i) => (
        <img
          key={i}
          src={el.src}
          alt="Y2K Element"
          className="absolute transition-transform duration-500 hover:scale-110"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            transform: `rotate(${el.rotate}deg)`,
            animation: `float ${el.duration}s ease-in-out ${el.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* 自定义漂浮动画 */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-15px) translateX(5px) rotate(5deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
      `}</style>
    </main>
  );
}
