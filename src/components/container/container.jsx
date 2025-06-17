import Navbar from "../Nav/Navbar";

const Container = ({ children }) => {
  return (
    <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] max-w-[1920px] mx-auto w-full">
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default Container;
