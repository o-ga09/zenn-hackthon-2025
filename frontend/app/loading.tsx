export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFCCEA] via-white to-[#BFECFF] p-8">
      <div className="text-center space-y-8">
        {/* 波打つドットのアニメーション */}
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>

        {/* ローディングテキスト */}
        <p className="text-xl font-medium bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
          読み込み中...
        </p>
      </div>
    </div>
  );
}
