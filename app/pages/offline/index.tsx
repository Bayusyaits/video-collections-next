/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Head from "next/head";

import Component from "./OfflineView";

export default function OfflineContainer() {
  return (
    <>
      <Head>
        <title>Offline Mode | Collections</title>
      </Head>
      <Component />
    </>
  );
}
