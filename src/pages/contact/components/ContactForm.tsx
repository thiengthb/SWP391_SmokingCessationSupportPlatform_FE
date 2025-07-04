import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { ContactFormData } from "@/types/models/contact";
import { useTranslation } from "react-i18next";

export function ContactForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("page.contact.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t("page.contact.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("page.contact.form.name")}</Label>
          <Input
            id="name"
            value={formData.name}
            placeholder={t("page.contact.form.placeholderName")}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            placeholder="your@email.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subject">{t("page.contact.form.subject")}</Label>
          <Input
            id="subject"
            value={formData.subject}
            placeholder={t("page.contact.form.placeholderSubject")}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">{t("page.contact.form.message")}</Label>
          <Textarea
            id="message"
            value={formData.message}
            placeholder={t("page.contact.form.placeholderMessage")}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="min-h-[150px]"
            required
          />
        </div>

        {success && (
          <p className="text-green-600">
            {t("page.contact.form.successMessage")}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? t("page.contact.form.sending")
            : t("page.contact.form.submit")}
        </Button>
      </form>
    </div>
  );
}
