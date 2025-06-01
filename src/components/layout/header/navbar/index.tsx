import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu"
import { NavigationItems } from "./NavigationItems"
import { mainNav } from "./navbar.item"
import { ModeToggle } from "@/components/theme/theme-toggle"
import Logo from "../Logo"
import { UserNav } from "./UserNav"

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token")

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 xl:px-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center justify-between md:gap-4 xl:gap-8 2xl:gap-12">
          <nav className="hidden md:flex">
            <NavigationItems items={mainNav} />
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <UserNav />
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="hidden lg:inline-flex"
                >
                  <Link to="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
                <div className="hidden lg:flex">
                  <ModeToggle />
                </div>
              </>
            )}
          </div>
          <MobileMenu items={mainNav} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
