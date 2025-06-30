import { ParallaxProvider } from "react-scroll-parallax";
import { BackgroundProvider, useBackground } from "@/context/BackgroundContext";
import Navbar from "../Nav/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const { background } = useBackground();

  return (
    <main
      className="min-h-screen text-black"
      style={{ background: background ? background : "black" }}
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
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    <Layout>{children}</Layout>
  </BackgroundProvider>
);

export default LayoutWrapper;
