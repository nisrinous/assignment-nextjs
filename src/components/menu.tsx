import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { PiSparkleLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import Cookies from "universal-cookie";
import router from "next/router";

const Menu = () => {
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("user-role", { path: "/" });
    cookies.remove("user-id", { path: "/" });
    router.push("/auth/signin");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="border-none">
          <CiUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-center">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-right">
          <DropdownMenuItem>
            <Link href="/profile">
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/subscription" className="flex flex-row">
              <span>Premium </span>
              <IconContext.Provider value={{ color: "yellow" }}>
                <PiSparkleLight />
              </IconContext.Provider>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span onClick={() => logout()}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
