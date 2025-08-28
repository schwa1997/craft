"use client";
import { useEffect, useState } from "react";

export default function ENFPLanding() {
  const [balls, setBalls] = useState<
    { top: number; left: number; size: number; duration: number; delay: number }[]
  >([]);
  const [elements, setElements] = useState<
    {
      src: string;
      top: number;
      left: number;
      size: number;
      rotate: number;
      duration: number;
      delay: number;
      anim: string;
    }[]
  >([]);
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    // ENFP 风格随机句子
    const quotes = [
      "人生是旷野 🌿",
      "Shoot for the moon ✨",
      "go fuck yourself",
      "abracadabra 🎶",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const newBalls = Array.from({ length: 12 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 20 + 20,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setBalls(newBalls);

    // Y2K 元素
    const y2kImgs = [
      "https://www.clipartmax.com/png/full/126-1261994_hello-kitty-png-icon-hello-kitty-png-icons.png",
      "https://www.freeiconspng.com/uploads/hello-kitty-icon-29.png",
      "https://global-static.popmart.com/globalAdmin/1752142640187____skullpanda____.png?x-oss-process=image/format,webp",
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/696/small/cute-purple-heart-shape-y2k-3d-kpop-png.png",
      "https://img.icons8.com/?size=512&id=juRF5DiUGr4p&format=png",
      "https://cdn4.iconfinder.com/data/icons/y2k-holographic-elements-3d/512/heart_230214.png",
      "https://static.vecteezy.com/system/resources/thumbnails/027/147/687/small_2x/y2k-gradient-heart-holographic-soft-aura-blurred-aesthetic-shape-png.png",
      "https://cdn-icons-png.flaticon.com/512/11733/11733419.png",
      "https://cdn-icons-png.flaticon.com/256/6009/6009649.png",
      "https://png.pngtree.com/png-clipart/20241208/original/pngtree-y2k-holographic-icon-3d-png-image_17667658.png",
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/768/small/crescent-moon-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/previews/049/795/819/non_2x/rabbit-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/previews/049/795/812/non_2x/ufo-y2k-dreamy-retro-airbrush-kpop-chrome-png.png",
      "https://static.vecteezy.com/system/resources/thumbnails/049/795/713/small/cute-rabbit-y2k-3d-kpop-png.png",
      "https://static.vecteezy.com/system/resources/previews/027/310/120/non_2x/heart-in-rings-y2k-element-with-pastel-hologram-holographic-chrome-3d-effect-png.png",
    ];

    const anims = ["float", "drift", "wiggle", "chaos-bounce", "chaos-spin"];
    const newElements = y2kImgs.map((src) => ({
      src,
      top: Math.random() * 70 + 10,
      left: Math.random() * 70 + 10,
      size: Math.random() * 60 + 40,
      rotate: Math.random() * 60 - 30,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
      anim: anims[Math.floor(Math.random() * anims.length)],
    }));
    setElements(newElements);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden flex items-center justify-center">
      {/* 随机句子 - chaotic animation */}
      <h1 className="absolute top-20 text-3xl md:text-5xl font-extrabold text-center px-4 animate-ping bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
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
          className="absolute transition-transform duration-500 hover:scale-125"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            transform: `rotate(${el.rotate}deg)`,
            animation: `${el.anim} ${el.duration}s ease-in-out ${el.delay}s infinite alternate, 
                        pulseGlow ${el.duration + 3}s ease-in-out infinite`,
        
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) translateX(15px) rotate(15deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
        }
        @keyframes drift {
          0% {
            transform: translate(-20px, -10px) rotate(-10deg);
          }
          50% {
            transform: translate(20px, 15px) rotate(15deg);
          }
          100% {
            transform: translate(-20px, -10px) rotate(-10deg);
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-5deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.1);
          }
        }
        @keyframes chaos-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.15);
          }
        }
        @keyframes chaos-spin {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.15);
          }
        }
        @keyframes pulseGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 5px rgba(255, 0, 200, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(0, 200, 255, 1));
          }
        }

        /* Chaotic text animation */
        @keyframes chaosText {
          0% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
          25% {
            transform: scale(1.1) rotate(-3deg) translateY(-10px);
          }
          50% {
            transform: scale(0.95) rotate(3deg) translateY(5px);
          }
          75% {
            transform: scale(1.05) rotate(-2deg) translateY(-5px);
          }
          100% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
        }
        .animate-chaos-text {
          animation: chaosText 4s infinite ease-in-out,
            pulseGlow 5s infinite ease-in-out;
        }
      `}</style>
    </main>
  );
}
