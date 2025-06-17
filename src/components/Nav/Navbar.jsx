// components/Navbar.jsx
import { useRouter } from "next/router";
import Container from "../container/container";
import NavIcon from "../../../assets/NavIcon3.png";
import MenuButton from "../../../assets/menu1.png";
import Image from "next/image";
import { Sora } from "next/font/google";

const Navbar = () => {
  const router = useRouter();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Partners", path: "/partners" },
    { name: "News", path: "/news" },
    { name: "Enquire", path: "/enquire" },
    { name: "Our Work", path: "/work" },
  ];
  console.log(router?.pathname);
  return (
    <header className="w-full bg-transparent">
      <nav className="py-7">
        <Container>
          <div className="flex items-center justify-between w-full relative">
            {/* LEFT: Logo */}
            <Image src={NavIcon} alt="Logo" width={145} />

            {/* CENTER: Navigation Links */}
            <ul className="hidden lg:flex xl:gap-5 lg:gap-3 text-base font text-black font-sora font-normal">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.path;

                return (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className={`px-3 py-1 rounded-[20.5px] ${
                        isActive
                          ? "bg-[#FFDDDD] border border-[rgba(242,27,42,0.26)] text-[#F21B2A]"
                          : "hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* RIGHT: Menu Icon */}
            <button className="cursor-pointer">
              <Image src={MenuButton} alt="Menu" width={35} />
            </button>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
