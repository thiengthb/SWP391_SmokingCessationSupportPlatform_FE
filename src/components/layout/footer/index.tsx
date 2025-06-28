import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="w-full border-t bg-background">
      <div className="lg:max-w-[1248px] lg:mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">{t("footer.about.title")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("footer.about.description")}
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">{t("footer.links.title")}</h4>
            <ul className="space-y-2 text-sm grid grid-cols-2 sm:grid-cols-1">
              {["home", "about", "contact", "blog", "terms", "privacy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(`footer.links.${item}`)}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">
              {t("footer.connect.title")}
            </h4>
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
            <h4 className="text-lg font-semibold">
              {t("footer.subscribe.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("footer.subscribe.description")}
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder={t("footer.subscribe.placeholder")}
                type="email"
              />
              <Button>{t("footer.subscribe.button")}</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="mb-8 border-t" />
          <p className="text-sm text-muted-foreground">
            © 2024 Somking Project. {t("footer.bottom.copyright")}
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">
              {t("footer.bottom.terms")}
            </a>
            <a href="#" className="hover:text-primary">
              {t("footer.bottom.privacy")}
            </a>
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
