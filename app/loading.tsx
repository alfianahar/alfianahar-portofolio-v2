import Image from "next/image";
import loading from "../public/grid.svg";

const Loading = () => {
  return (
    <div className="fixed h-screen w-screen bg-slate-300/50 flex justify-center items-center z-100">
      <Image src={loading} alt="loading-grid" />
    </div>
  );
};

export default Loading;
