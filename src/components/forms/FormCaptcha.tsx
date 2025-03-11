
import { useState, useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';

interface FormCaptchaProps {
  form: UseFormReturn<any>;
  name: string;
}

const FormCaptcha = ({ form, name }: FormCaptchaProps) => {
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Generate a simple math captcha
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaValue(`${num1} + ${num2} = ?`);
    setCaptchaAnswer((num1 + num2).toString());
  }, []);

  // Expose the captcha answer to be validated
  useEffect(() => {
    if (form && captchaAnswer) {
      // Store the answer in the form context for validation
      form.setValue('captchaAnswer', captchaAnswer);
    }
  }, [captchaAnswer, form]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Security Check</FormLabel>
          <div className="flex flex-col space-y-2">
            <div className="bg-gray-100 p-2 rounded-md font-medium text-center">
              {captchaValue}
            </div>
            <FormControl>
              <Input placeholder="Enter the answer" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCaptcha;
