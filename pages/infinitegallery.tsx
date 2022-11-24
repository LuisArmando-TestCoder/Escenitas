import Head from "next/head";
import * as Components from "../components";

function InfiniteGallery() {
  return (
    <div>
      <Head>
        <title>InfiniteGallery | Home for 3D experiments</title>
        <meta name="description" content="InfiniteGallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Components.L1.Canvas3D
        id={"InfiniteGallery"}
        scenes={["Default", "InfiniteGallery"]}
      />
    </div>
  );
}

export default InfiniteGallery;
