// import { inter } from "../../app/layout";
import Image from "next/image";
import { cn } from "../../lib/utils";

export const IconButton = ({ src, label }) => {
  return (
    <div className="flex cursor-pointer justify-between rounded-[25px] items-center bg-gradient-to-b border-2 p-2 border-color-[#020321] from-[#253579] to-[#0D1336] ">
      <Image width={20} height={20} src={src} />
      <p className={cn("text-white text-[16px] ml-2 font-[600]")}>{label}</p>
    </div>
  );
};
