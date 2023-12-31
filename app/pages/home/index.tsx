import React from "react";
import Head from "next/head";
import Home from "./HomeView";

type HomeProps = {};
const HomeContainer: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Home | Collections</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
}

export default HomeContainer