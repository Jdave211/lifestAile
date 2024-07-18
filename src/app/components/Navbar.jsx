"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import logoImage from "../../../assets/appwhite_space_logo.png";

// Social lOGIN
import logo from "./../../../assets/lifestai-logo.png";
import google from "./../../../assets/google.png";
import linkedin from "./../../../assets/linkedin.png";
import email from "./../../../assets/email.png";

const IconButton = ({ src, label }) => {
  return (
    <div className="flex cursor-pointer justify-between rounded-[25px] items-center bg-gradient-to-b border-2 p-2 border-color-[#020321] from-[#253579] to-[#0D1336] ">
      <Image width={20} height={20} src={src} />
      <p className="text-white text-[16px] ml-2 font-[600]">{label}</p>
    </div>
  );
};
const Navbar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => {
    console.log("first");
    setLoginModal(true);
  };
  const closeLoginModal = () => {
    console.log("first");
    setLoginModal(false);
  };

  return (
    <header className="h-[">
      <div className="flex max-w-[1920px] px-20 text-white justify-between items-center bg-gradient-to-b h-[90px] from-[#000000] to-[#5271FF]">
        {" "}
        <div>
          <Link href="/">
            <Image height={50} width={50} src={logoImage} />
          </Link>
        </div>
        <nav>
          <ul className="flex gap-6 items-center justify-between">
            <Link href="/">
              <p>Home</p>
            </Link>
            <Link href="/ai-news">
              <p>Ai News</p>
            </Link>
            <Link href="/categories">
              <p>Categories</p>
            </Link>
            <Link href="/comparison-tool">
              <p>Comparison Tool</p>
            </Link>
            <Link href="/invite-a-friend">
              <p>Invite a friend</p>
            </Link>
          </ul>
        </nav>
        <div>
          <button
            onClick={openLoginModal}
            type="button"
            class="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Login
          </button>
          <Link href={"/sign-up"}>Sign Up</Link>
        </div>
        {loginModal && (
          <div class=" overflow-y-auto flex bg-[#000000]/80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Close Modal Button */}
              <button
                type="button"
                onClick={closeLoginModal}
                className="absolute right-[-2.5rem] top-[2.5rem]"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              {/* <!-- Modal content --> */}
              <div className="relative p-5 bg-gradient-to-b max-w-[691px] from-[#0D1335] to-[#27377D] rounded-[60px] shadow ">
                {/* <!-- Modal header --> */}
                <div className="flex items-center flex-col justify-center">
                  <Image height={100} src={logo} />

                  <h3 className="text-xl mb-4 font-semibold text-white">
                    Sign in
                  </h3>

                  {/* Social Login Buttons */}
                  <div className="flex items-center justify-between space-x-2">
                    <IconButton src={google} label="Google" />
                    <IconButton src={linkedin} label="Linkedin" />
                    <IconButton src={email} label="Email" />
                  </div>
                  <h1 className="py-2 text-center text-gray-500">OR</h1>
                </div>
                {/* <!-- Modal body --> */}
                <div className="px-4 pb-4 md:p-5">
                  <form className="space-y-2" action="#">
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-transparent h-[40px] border-[2px] border-white  text-sm rounded-[25px] block w-full p-2.5 text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-transparent h-[40px] border-[2px] border-white  text-sm rounded-[25px] block w-full p-2.5 text-white"
                        required
                      />
                    </div>
                    <div class="flex justify-between">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                          />
                        </div>
                        <label
                          for="remember"
                          className="ms-2 text-sm font-medium text-white"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="w-fit text-white  bg-gradient-to-b p-2 rounded-[25px] from-[#253579] to-[#4462DF]"
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-sm font-medium  text-white text-center">
                      Not registered?{" "}
                      <a
                        href="/sign-up"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        sign up
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
