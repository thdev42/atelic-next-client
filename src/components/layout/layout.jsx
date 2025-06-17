import { Sora } from "next/font/google";
import Container from "../container/container";
import Navbar from "../Nav/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <main className={` bg-[#e9e9e9] text-black min-h-screen`}>
        <Navbar />
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
