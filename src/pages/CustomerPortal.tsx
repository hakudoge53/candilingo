
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Registration form schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const CustomerPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUser, setActiveUser] = useState<{name: string, email: string} | null>(null);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: LoginFormValues) => {
    // For demonstration, we'll just simulate a successful login
    console.log("Login values:", values);
    
    // Simulate API call delay
    setTimeout(() => {
      // Demo success - in real app we'd verify credentials
      setIsLoggedIn(true);
      setActiveUser({
        name: "Demo User",
        email: values.email
      });
      toast.success("Login successful!");
    }, 1000);
  };

  // Handle registration submission
  const onRegisterSubmit = (values: RegisterFormValues) => {
    // For demonstration, we'll just simulate a successful registration
    console.log("Register values:", values);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Registration successful! You can now log in.");
      registerForm.reset();
    }, 1000);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveUser(null);
    toast.info("You have been logged out.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-techlex-blue text-center">Customer Portal</h1>
          
          {!isLoggedIn ? (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to TechLex</CardTitle>
                <CardDescription>
                  Login or create an account to access exclusive features and resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-techlex-blue">
                          Sign In
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full bg-techlex-blue">
                          Create Account
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {activeUser?.name}!</CardTitle>
                <CardDescription>
                  You're now logged into your TechLex account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-techlex-blue mb-2">Account Information</h3>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {activeUser?.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Membership:</span> Professional</p>
                  <p className="text-gray-700"><span className="font-medium">Status:</span> Active</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-techlex-blue mb-2">Your Resources</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Technical Glossary Access</li>
                    <li>Resume Analysis Tools</li>
                    <li>Developer Skills Assessment</li>
                    <li>Interview Preparation Materials</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerPortal;
