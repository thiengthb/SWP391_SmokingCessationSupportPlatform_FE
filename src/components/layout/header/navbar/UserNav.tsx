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
import { useAuth } from "@/contexts/AuthContext";
import { UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

export function UserNav() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
              alt={auth.currentUser?.username ?? t("roles.user")}
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
              {auth.currentUser?.username || t("roles.guest")}
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
              {t(`nav.dashboard.title`)}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile" className="w-full">
              {t(`nav.profile.title`)}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/settings" className="w-full">
              {t(`nav.settings.title`)}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={submitLogout}>
          {t(`buttons.logout`)}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
