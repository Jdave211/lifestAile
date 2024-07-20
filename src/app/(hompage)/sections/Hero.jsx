import React from "react";

import logo2 from "../../../../assets/lifestai-logo.png";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { inter } from "../../layout";
// General Hero section of the homepage

const TestimonalCard = ({ author, testimony }) => {
  return (
    <div className="bg-gradient-to-b items-center col-span-1 flex flex-col justify-center from-[#5271FF]/50 p-3 to-[#314499]/25 rounded-[40px] min-h-[200px] max-w-[400px]">
      <p
        className={cn(
          '"text-[24px] font-[24px] text-white font-400 tracking-wide leading-8 mb-5"',
          inter.className
        )}
      >
        {testimony}
      </p>

      <p className="text-right text-md leading-[24.19px] font-[24px] text-white font-400 tracking-wide">
        - {author}
      </p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen grid  items-center grid-cols-2 mx-auto bg-gradient-to-r from-[#000116] to-[#020031]   justify-center gap-2">
      <div className=" max-w-[998px] p-[20px] ">
        {" "}
        <div>
          <Image src={logo2} height={158} width={414} />

          <div className="h-[50px] border-[2px] border-white   rounded-[25px] p-2 flex">
            <input
              type="search"
              name="search"
              id="search"
              className="bg-transparent   text-sm rounded-[25px] block w-full p-2.5 text-white"
              placeholder="name@company.com"
              required
            />
            <button className="bg-white text-md text-center text-black rounded-[25px] px-8 h-full py-2">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 pt-20 gap-5">
        <TestimonalCard
          testimony="  “Never found an easier website to find and discover ai tools”"
          author="Williams"
        />
        <TestimonalCard
          testimony="  “Never found an easier website to find and discover ai tools”"
          author="Dave"
        />

        <TestimonalCard
          testimony="  “Never found an easier website to find and discover ai tools”"
          author="Kim"
        />

        <TestimonalCard
          testimony="  “Never found an easier website to find and discover ai tools”"
          author="Sarah"
        />
      </div>
    </section>
  );
};

export default Hero;
