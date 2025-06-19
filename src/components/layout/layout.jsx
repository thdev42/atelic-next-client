import { ParallaxProvider } from "react-scroll-parallax";
import { BackgroundProvider, useBackground } from "@/context/BackgroundContext";
import Navbar from "../Nav/Navbar";

const Layout = ({ children }) => {
  const { background } = useBackground();

  return (
    <main
      className="min-h-screen text-black"
      style={{ background: background }}
    >
      <ParallaxProvider>
        <Navbar />
        {children}
      </ParallaxProvider>
    </main>
  );
};
const LayoutWrapper = ({ children }) => (
  <BackgroundProvider>
    <Layout>{children}</Layout>
  </BackgroundProvider>
);

export default LayoutWrapper;
