import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactFormData } from "@/types/models/contact";
import { useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

export function ContactForm() {
  const { tContact } = useTranslate();
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
          {tContact("contact.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {tContact("contact.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">{tContact("contact.form.name")}</Label>
          <Input
            id="name"
            value={formData.name}
            placeholder={tContact("contact.form.placeholderName")}
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
          <Label htmlFor="subject">{tContact("contact.form.subject")}</Label>
          <Input
            id="subject"
            value={formData.subject}
            placeholder={tContact("contact.form.placeholderSubject")}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">{tContact("contact.form.message")}</Label>
          <Textarea
            id="message"
            value={formData.message}
            placeholder={tContact("contact.form.placeholderMessage")}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="min-h-[150px]"
            required
          />
        </div>

        {success && (
          <p className="text-green-600">
            {tContact("contact.form.successMessage")}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? tContact("contact.form.sending")
            : tContact("contact.form.submit")}
        </Button>
      </form>
    </div>
  );
}
