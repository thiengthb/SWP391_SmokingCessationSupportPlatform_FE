import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { NavItems } from "./navbar.item";
import ThemeSwitch from "@/components/theme/theme-switch";
import { useAuth } from "@/contexts/AuthContext";

const MobileMenu = ({ items }: NavItems) => {
  const navigate = useNavigate();
  const { auth, handleLogout } = useAuth();

  const filteredItems = items.filter(
    (item) => !item.requireAuth || (item.requireAuth && auth.isAuthenticated)
  );

  const submitLogout = async () => {
    await handleLogout();
    navigate("/auth/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-2 p-4">
          <Link
            to={
              auth.currentUser?.role
                ? `/${auth.currentUser?.role.toLowerCase()}/dashboard`
                : `/dashboard`
            }
            className="block text-base transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          {filteredItems.map((item) => (
            <div key={item.href} className="space-y-3">
              {item.items ? (
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-base">
                    {item.title}
                    <ChevronsUpDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-2 space-y-2 border-l">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-primary"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.href}
                  className="block text-base transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          {!auth.isAuthenticated ? (
            <div className="flex justify-between items-center">
              <p>Theme</p>
              <ThemeSwitch />
            </div>
          ) : null}
          <SheetFooter>
            {auth.isAuthenticated ? (
              <SheetClose asChild>
                <Button variant="secondary" onClick={submitLogout}>
                  Logout
                </Button>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button asChild>
                    <Link to="/auth/register">Sign Up</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="secondary" asChild>
                    <Link to="/auth/login">Login</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
