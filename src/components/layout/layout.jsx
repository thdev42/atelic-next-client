import { Sora } from "next/font/google";
import Container from "../container/container";
import Navbar from "../Nav/Navbar";
import { ParallaxProvider } from "react-scroll-parallax";
const Layout = ({ children }) => {
  return (
    <>
      <main className={` bg-[#e9e9e9] text-black min-h-screen`}>
        <ParallaxProvider>
          <Navbar />
          <Container>{children}</Container>
        </ParallaxProvider>
      </main>
    </>
  );
};

export default Layout;
