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
import Cookies from "js-cookie";

import router from "next/router";
import { useDispatch } from "react-redux";
import { setAttribute } from "@/store/slices/userSlice";
import { useEffect } from "react";

const Menu = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");

  const logout = () => {
    Cookies.remove("user-role", { path: "/" });
    Cookies.remove("user-id", { path: "/" });
    Cookies.remove("user-membership", { path: "/" });
    Cookies.remove("authToken", { path: "/" });
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (token) {
      dispatch(
        setAttribute({
          token: token,
          id: Cookies.get("user-id"),
          role: Cookies.get("user-role"),
          membership: Cookies.get("user-membership"),
        })
      );
    }
  });

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
            <Link href="/user">
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/subscription" className="flex flex-row">
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
