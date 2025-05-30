import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

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
              {["Home", "About", "Contact", "Blog", "Terms", "Privacy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social}
                  </a>
                )
              )}
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
            <a href="#" className="hover:text-primary">
              Terms
            </a>
            <a href="#" className="hover:text-primary">
              Privacy
            </a>
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
