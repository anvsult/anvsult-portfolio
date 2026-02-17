'use client'

import { useState } from "react";
import { sendMessage } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const formDataToSend = new FormData(e.currentTarget);
    const result = await sendMessage(formDataToSend);
    setIsPending(false);

    if (result.success) {
      toast.success("Message sent!", { description: "I will get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form fields
      setErrors({}); // Clear any remaining errors
    } else {
      if (result.details?.fieldErrors) {
        setErrors(result.details.fieldErrors);
        toast.error("Validation Error", { description: "Please check the highlighted fields." });
      } else {
        toast.error("Error", { description: result.error });
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Input
          name="subject"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={handleInputChange}
        />
        {errors.subject && <p className="text-sm text-destructive">{errors.subject[0]}</p>}
      </div>
      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder="How can I help you?"
          rows={5}
          required
          value={formData.message}
          onChange={handleInputChange}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message[0]}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
