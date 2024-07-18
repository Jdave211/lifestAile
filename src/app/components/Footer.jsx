import React from "react";
import Image from "next/image";

// Footer social contact
import email from "../../../assets/email.icon.png";
import instagram from "../../../assets/instagram.png";
import linkedin from "../../../assets/linkedin-footer.png";
import tiktok from "../../../assets/tiktok.png";
import x from "../../../assets/x.png";

// Footer App Logo
import logo1 from "../../../assets/appwhite_space_logo.png";
import logo2 from "../../../assets/lifestai-logo.png";

const Footer = () => {
  return (
    <footer className="h-[100px] bg-gradient-to-b items-center flex justify-between from-[#000000] to-[#2B2B2B] p-20 text-white">
      <div className="flex justify-between items-center gap-4">
        <div className="h-[68px] w-[68px] bg-[#000000] rounded-full grid items-center justify-center">
          <Image
            src={logo1}
            height="100%"
            width="100%"
            className="object-contain"
          />
        </div>
        <Image src={logo2} height={45} width={135} />
        <Image />
      </div>
      <div className="flex justify-between items-center max-w-[498px] gap-4">
        <p className="font-[400] text-md leading-[24.5px] text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco
        </p>
      </div>
      <div className="flex justify-between items-center flex-col gap-4">
        <h3>Contact Us</h3>
        <div className="flex gap-x-4">
          <Image className="cursor-pointer" width={34} height={34} src={x} />
          <Image
            className="cursor-pointer object-contain"
            width={34}
            height={34}
            onResize={"contain"}
            src={instagram}
          />
          <Image
            className="cursor-pointer"
            width={34}
            height={34}
            src={email}
          />
          <Image
            className="cursor-pointer"
            width={34}
            height={34}
            src={tiktok}
          />
          <Image
            className="cursor-pointer"
            width={34}
            height={34}
            src={linkedin}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
