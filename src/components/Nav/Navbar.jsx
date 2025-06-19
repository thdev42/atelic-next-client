// components/Navbar.jsx
import { useRouter } from "next/router";
import Container from "../container/container";
import NavIcon from "../../../assets/AtelicNavLogo.png";
import MenuButton from "../../../assets/menu1.png";
import Image from "next/image";
import { Sora } from "next/font/google";
import { useBackground } from "@/context/BackgroundContext";
const Navbar = () => {
  const router = useRouter();
  const { activeHeroIndex } = useBackground();
  const isDarkHero = activeHeroIndex === 2;

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
      <nav className="z-50 py-0">
        <Container>
          <div className="px-4 sm:px-8 md:px-12 xl:px-[178px] flex items-center justify-between w-full relative">
            {/* LEFT: Logo */}
            <Image src={NavIcon} alt="Logo" width={173} />

            {/* CENTER: Navigation Links */}
            <ul
              className={`hidden lg:flex 2xl:gap-5 lg:gap-1 2xl:text-[20px] lg:text-sm font ${
                isDarkHero ? "text-white" : "text-black"
              }  font-sora font-normal`}
            >
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
              <Image src={MenuButton} alt="Menu" width={38} />
            </button>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
