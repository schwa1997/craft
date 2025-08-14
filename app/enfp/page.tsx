// app/enfp/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function ENFPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100 p-6">
      {/* 页眉 */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-800 mb-4">
          <span className="inline-block animate-bounce">🐾</span> 欢迎来到小狗乐园 
          <span className="inline-block animate-bounce">🐾</span>
        </h1>
        <p className="text-xl text-amber-600">汪星人的快乐天地</p>
      </header>

      {/* 主要内容区域 */}
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 小狗成员板块 */}
          <Link href="/enfp/member">
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-amber-300 hover:border-amber-400 transform hover:scale-105 transition-transform cursor-pointer">
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLa6CKxJr1VZIeOJRGohbazIfL_zMZKF7GOg&s" // 替换为你自己的小狗成员图片
                  alt="小狗成员"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-center text-amber-700 mb-2">小狗成员</h2>
              <p className="text-amber-600 text-center">认识我们可爱的汪星人大家庭</p>
              <div className="flex justify-center mt-4">
                <span className="text-amber-500 text-2xl animate-pulse">→</span>
              </div>
            </div>
          </Link>

          {/* 小狗开会板块 */}
          <Link href="/enfp/meeting">
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-blue-300 hover:border-blue-400 transform hover:scale-105 transition-transform cursor-pointer">
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://i.pinimg.com/736x/1e/e0/c1/1ee0c17721369dc7dcd463b9f349abe3.jpg" // 替换为你自己的小狗开会图片
                  alt="小狗开会"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">小狗开会</h2>
              <p className="text-blue-600 text-center">汪星人的重要会议和决策</p>
              <div className="flex justify-center mt-4">
                <span className="text-blue-500 text-2xl animate-pulse">→</span>
              </div>
            </div>
          </Link>

          {/* 小狗活动板块 */}
          <Link href="/enfp/activity">
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-green-300 hover:border-green-400 transform hover:scale-105 transition-transform cursor-pointer">
              <div className="relative h-48 mb-4">
                <Image 
                  src="https://img.freepik.com/premium-vector/cute-dog-cartoon-illustration_569774-124.jpg" // 替换为你自己的小狗活动图片
                  alt="小狗活动"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-center text-green-700 mb-2">小狗活动</h2>
              <p className="text-green-600 text-center">一起玩耍、奔跑和撒欢</p>
              <div className="flex justify-center mt-4">
                <span className="text-green-500 text-2xl animate-pulse">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 flex justify-center space-x-8">
          <span className="text-4xl animate-bounce">🐶</span>
          <span className="text-4xl animate-bounce delay-75">🦴</span>
          <span className="text-4xl animate-bounce delay-100">🐕</span>
          <span className="text-4xl animate-bounce delay-150">🎾</span>
          <span className="text-4xl animate-bounce delay-200">🐩</span>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="mt-16 text-center text-amber-700">
        <p>汪汪队立大功 © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}