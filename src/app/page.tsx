import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import TshirtForm from "@/components/TshirtForm";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="scrollbar-hide flex h-[90dvh] w-[clamp(1000px,80vw,1000px)] flex-col gap-4 overflow-auto rounded-lg bg-white p-5 shadow-lg inset-shadow-2xs drop-shadow-2xl">
        <Header />
        <Paragraph />
        <hr className="my-2 border-2" />
        <TshirtForm />
        <div className="text-center font-bold">Powered by Mahmoud Alaa</div>{" "}
      </div>
    </div>
  );
}
