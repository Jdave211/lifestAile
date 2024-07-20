import React from "react";
import { Input } from "../../../components/ui/input";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { inter } from "../../layout";
const SignUp = () => {
  return (
    <main className="mt-[90px] h-[80vh] w-full bg-gradient-to-r to-[#000026] from-[#000116] p-3  flex flex-col items-center justify-center ">
      <section className="w-[900px] flex gap-5 items-center justify-evenly">
        <div>
          <Image
            className="object-cover"
            width={444}
            height={158}
            src="/lifestai-logo.png"
          />
          {/* <h1 className="text-xl font-bold text-white">
            Find AI tools that you need
          </h1> */}
        </div>
        <form className="w-full flex flex-col gap-3 max-w-md text-white p-5  rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-white">
            Sign up for a free account
          </h2>
          <div className="flex space-x-2">
            <Input placeholder={"First Name"} />
            <Input placeholder={"Last Name"} />
          </div>
          <div className="w-full flex flex-col gap-5">
            <Input placeholder={"Email"} />
            <Input placeholder={"Username"} />
            <Input placeholder={"Password"} type="password" />
          </div>

          <button className="bg-gradient-to-b w-full h-[50px] px-5 text-center rounded-full from-[#000000] to-[#5271FF]">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignUp;
