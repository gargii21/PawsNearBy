import React from "react";
import Hero from "../components/Hero";
import Search from "../components/Search";
import Steps from "../components/Steps";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <Search />
      <Steps />
      <Services />
      <Testimonials />
    </>
  );
}

export default Home;
