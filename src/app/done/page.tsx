export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="scrollbar-hide hh flex h-[50dvh] w-[clamp(1000px,80vw,1000px)] flex-col items-center justify-center gap-4 overflow-auto rounded-lg bg-white p-5 shadow-lg inset-shadow-2xs drop-shadow-2xl">
        <div className="mb-5 text-center text-6xl font-bold text-green-500">
          تم الحجز
        </div>
        <div>تم الحجز بنجاح لو عاوز تعدل كلمني او كلم شحاتة</div>
        <div className="text-center font-bold">
          Powered by Mahmoud Alaa
        </div>{" "}
      </div>
    </div>
  );
}
