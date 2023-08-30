import LoadingView from "./LoadingView";
import Head from "next/head";

const LoadingContainer = () => {
  return (
    <>
      <Head>
        <title>Loading | Animelist</title>
        <meta name="description" content="Loading Animelist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingView />
    </>
  );
};

export default LoadingContainer;
