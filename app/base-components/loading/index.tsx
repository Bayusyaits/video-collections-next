import LoadingView from "./LoadingView";
import Head from "next/head";

const LoadingContainer = () => {
  return (
    <>
      <Head>
        <title>Loading | Collections</title>
        <meta name="description" content="Loading Collections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingView />
    </>
  );
};

export default LoadingContainer;
