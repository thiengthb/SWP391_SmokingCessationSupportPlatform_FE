import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRound } from "lucide-react";

export function UserNav() {
  const navigate = useNavigate();
  const { auth, handleLogout } = useAuth();

  const submitLogout = async () => {
    await handleLogout();
    navigate("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={auth.currentUser?.avatar ?? ""}
              alt={auth.currentUser?.username ?? "User"}
            />
            <AvatarFallback>
              <UserRound />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {auth.currentUser?.username || "Guest"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth.currentUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              to={`/${auth.currentUser?.role?.toLowerCase()}/dashboard`}
              className="w-full"
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile" className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/setting" className="w-full">
              Setting
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={submitLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
