"use client";

export default function ItaCabinet() {
  const y2kImgs = [
    "https://global-static.popmart.com/globalAdmin/1752142689784____dimoo____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752142673550____molly____.png?x-oss-process=image/format,webp",
    "https://www.clipartmax.com/png/full/126-1261994_hello-kitty-png-icon-hello-kitty-png-icons.png",
    "https://global-static.popmart.com/globalAdmin/1752142755438____%E5%B0%8F%E9%87%8E____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752142733155____crybaby____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752141886686____%E6%98%9F%E6%98%9F%E4%BA%BA-%E7%B4%A0%E4%BD%93%E5%9B%BE-ip%E5%9B%BA%E5%AE%9A%E5%B1%95%E7%A4%BA%E5%9B%BE____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752206119663____pucky-%E7%B4%A0%E4%BD%93%E5%9B%BE-ip%E5%9B%BA%E5%AE%9A%E5%B1%95%E7%A4%BA%E5%9B%BE____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752142936514____azura____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752564061888____nyota-%E7%B4%A0%E4%BD%93%E5%9B%BE-ip%E5%9B%BA%E5%AE%9A%E5%B1%95%E7%A4%BA%E5%9B%BE____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752142918080____hacipupu____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752142846849____zsiga____.png?x-oss-process=image/format,webp",
    "https://www.freeiconspng.com/uploads/hello-kitty-icon-29.png",
    "https://global-static.popmart.com/globalAdmin/1752142640187____skullpanda____.png?x-oss-process=image/format,webp",
    "https://img.icons8.com/?size=512&id=juRF5DiUGr4p&format=png",
    "https://global-static.popmart.com/globalAdmin/1751506747196____nyota140x140____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752649656395____hacipupu____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1751506846250____10007____.png?x-oss-process=image/format,webp",
    "https://cdn4.iconfinder.com/data/icons/y2k-holographic-elements-3d/512/heart_230214.png",
    "https://png.pngtree.com/png-clipart/20241208/original/pngtree-y2k-holographic-icon-3d-png-image_17667658.png",
    "https://global-static.popmart.com/globalAdmin/1751426860767____babymolly%E5%96%B5%E8%B6%A3%E6%A8%AA%E7%94%9F%E7%B3%BB%E5%88%97%E6%89%8B%E5%8A%9E____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1751535257511____%E7%A1%AC%E8%84%B8%E6%AF%9B%E7%BB%92%E7%8E%A9%E5%81%B6____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1751535551363____%E5%90%8A%E5%8D%A1____.png?x-oss-process=image/format,webp",
    "https://cdn-global.popmart.com/global-activities/pc/images/burstBloom2025/productItemImg1_1.png",
    "https://global-static.popmart.com/globalAdmin/1752649592824____dim0o____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752650660270____molly____.png?x-oss-process=image/format,webp",
    "https://global-static.popmart.com/globalAdmin/1752649608975____skullpanda____.png?x-oss-process=image/format,webp",
    "https://static.vecteezy.com/system/resources/thumbnails/049/795/713/small/cute-rabbit-y2k-3d-kpop-png.png",
    "https://static.vecteezy.com/system/resources/previews/027/310/120/non_2x/heart-in-rings-y2k-element-with-pastel-hologram-holographic-chrome-3d-effect-png.png",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100 p-8">
      {/* Cabinet container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full p-6 rounded-3xl">
        {/* Each image slot */}
        {y2kImgs.map((src, i) => (
          <div
            key={i}
            className="relative hover:animate-bounce rounded-2xl border-2 border-white/40 backdrop-blur-md bg-white/20 shadow-inner shadow-purple-100 flex items-center justify-center p-4 transition-all duration-300 hover:ring-4 hover:ring-pink-300/80 hover:shadow-pink-300/50"
          >
            <img
              src={src}
              alt={`Y2K Element ${i}`}
              className="max-h-32 object-contain transition-transform duration-500  "
            />
          </div>
        ))}
      </div>
    </main>
  );
}
