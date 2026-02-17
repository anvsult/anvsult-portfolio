import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
  email: z.email("Invalid email address."),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(100, { message: "Subject must be less than 100 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, { message: "Message must be less than 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const testimonialSchema = z.object({
  authorName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
  authorRole: z.string().min(2, { message: "Role must be at least 2 characters." }).max(50, { message: "Role must be less than 50 characters." }),
  contentEn: z.string().min(10, { message: "Testimonial must be at least 10 characters." }).max(500, { message: "Testimonial must be less than 500 characters." }),
  contentFr: z.string().max(500, { message: "Testimonial must be less than 500 characters." }).optional().or(z.literal('')),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

