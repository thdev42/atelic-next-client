import { ParallaxProvider } from "react-scroll-parallax";
import { BackgroundProvider, useBackground } from "@/context/BackgroundContext";
import Navbar from "../Nav/Navbar";
import { Toaster } from "react-hot-toast";
import { NavProvider, useNav } from "@/context/NavContext";
import { LoaderProvider } from "@/context/useLoader";

const Layout = ({ children }) => {
  const { background } = useBackground();
  const { isShowNav } = useNav();
  return (
    <main
      className="min-h-screen text-black"
      style={{ background: background ? background : "black" }}
    >
      <ParallaxProvider>
        {isShowNav && <Navbar />}
        {children}
      </ParallaxProvider>
    </main>
  );
};
const LayoutWrapper = ({ children }) => (
  <BackgroundProvider>
    <NavProvider>
      <LoaderProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Layout>{children}</Layout>
      </LoaderProvider>
    </NavProvider>
  </BackgroundProvider>
);

export default LayoutWrapper;
