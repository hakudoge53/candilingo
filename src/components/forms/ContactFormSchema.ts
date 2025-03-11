
import { z } from 'zod';

// Define form schema with validation
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(1, { message: "Company name is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  size: z.string().min(1, { message: "Please select your team size." }),
  captcha: z.string().min(1, { message: "Please complete the captcha." }),
  captchaAnswer: z.string(), // Hidden field to store the answer
}).refine((data) => data.captcha === data.captchaAnswer, {
  message: "Incorrect captcha answer. Please try again.",
  path: ["captcha"],
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const defaultContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  message: "",
  size: "",
  captcha: "",
  captchaAnswer: "",
};
