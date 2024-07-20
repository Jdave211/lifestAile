import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const inter = Inter({ subsets: ["latin"] });

const myFont = localFont({
  src: "../../assets/fonts/Azonix.otf",
  variable: "--inter-font-variable",
  display: "swap",
  weight: "400 600 700",
});

export const metadata = {
  title: "LifestAi",
  description: "Your gateway to ai web applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
