import React from "react";
import Navbar from "../components/Navbar";
import Hero from "./sections/Hero";
import FeaturedApps from "./sections/FeaturedApps";
const HomePage = () => {
  return (
    <div>
      {/* Hero [CTA Buttons like Get Started, main h1, p tag etc] */}
      <Hero />
      {/* Featured apps basically showing newly added or popular applications  or Trending*/}
      <FeaturedApps />
      {/* Containing basic information like privacy policy social links etc */}
    </div>
  );
};

export default HomePage;
