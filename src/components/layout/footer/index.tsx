import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const linkItems = [
    { name: "home", to: "/" },
    { name: "about", to: "/about-us" },
    { name: "contact", to: "/contact" },
    { name: "blog", to: "/blog" },
    { name: "terms", to: "/terms" },
    { name: "privacy", to: "/privacy" },
    { name: "faq", to: "/faq" },
  ];

  const socialItems = [
    { name: "Twitter", href: "https://x.com/home" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="w-full border-t bg-background">
      <div className="lg:max-w-[1248px] mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
          <div className="space-y-3 max-w-sm">
            <h4 className="text-lg font-semibold">{t("footer.about.title")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("footer.about.description")}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold">{t("footer.links.title")}</h4>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {linkItems.map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`footer.links.${name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold">
              {t("footer.about.social")}
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialItems.map(({ name, href }) => (
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
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground space-y-2">
          <p>© 2024 Smoking Project. {t("footer.bottom.copyright")}</p>
          <div className="flex justify-center space-x-4">
            <Link to="/terms" className="hover:text-primary">
              {t("footer.bottom.terms")}
            </Link>
            <Link to="/privacy" className="hover:text-primary">
              {t("footer.bottom.privacy")}
            </Link>
            <a href="#" className="hover:text-primary">
              {t("footer.bottom.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
