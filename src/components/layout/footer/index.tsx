import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="lg:max-w-[1248px] lg:mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">About Us</h4>
            <p className="text-sm text-muted-foreground">
              At ABC Music, we bring together artists and fans through the power
              of digital innovation.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm grid grid-cols-2 sm:grid-cols-1">
              {[
                { name: "Home", to: "/" },
                { name: "About", to: "/about-us" },
                { name: "Contact", to: "/contact" },
                { name: "Blog", to: "/blog" },
                { name: "Terms", to: "/terms" },
                { name: "Privacy", to: "/privacy" },
                { name: "FAQ", to: "/faq" },
              ].map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { name: "Twitter", href: "https://x.com/home" },
                { name: "Facebook", href: "https://facebook.com" },
                { name: "Instagram", href: "https://instagram.com" },
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                },
              ].map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Subscribe</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="mb-8 border-t" />
          <p className="text-sm text-muted-foreground">
            © 2024 ABC Music. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <a href="#" className="hover:text-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
