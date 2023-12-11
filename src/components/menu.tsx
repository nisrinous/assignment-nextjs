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
import { CiUser } from "react-icons/ci";
import { PiSparkleLight } from "react-icons/pi";

const Menu = () => {
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
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Premium </span>
            <PiSparkleLight />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
