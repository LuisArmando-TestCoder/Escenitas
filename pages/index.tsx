import type { AppProps } from "next/app";
// import dynamic from 'next/dynamic'
import Message from "../components/L0/Message";
import Canvas3D from "../components/L1/Canvas3D";

// const Canvas3D = dynamic(
//     () => import('../components/L1/Canvas3D')
// )

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Message text="Presiona P para inciar la canción"></Message>
      <Canvas3D scenes={["Default", "Main"]} id="main" />
      <audio src="./audios/Gibran 0.mp3" loop={true} />    </div>
  );
}

export default MyApp;
