import { Dispatch, SetStateAction, useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { User } from "../../utils/types";

type Props = {
  formLogin: boolean;
  setFormLogin: Dispatch<SetStateAction<boolean>>;
  user: User | null;
};

const Navbar = ({ formLogin, setFormLogin, user }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 600);

  const userLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <MobileNav
      user={user}
      userLogout={userLogout}
      formLogin={formLogin}
      setFormLogin={setFormLogin}
    />
  ) : (
    <DesktopNav
      user={user}
      userLogout={userLogout}
      formLogin={formLogin}
      setFormLogin={setFormLogin}
    />
  );
};

export default Navbar;
