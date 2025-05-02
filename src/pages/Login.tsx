
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import SharedLayout from "@/components/SharedLayout";

// Form schema validation
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((email) => email.endsWith("@s.amity.edu"), {
      message: "Email must be an Amity University email (@s.amity.edu)",
    }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
      navigate("/recommendations");
    } catch (error) {
      console.error("Login error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <SharedLayout title="Log In to AmiConnect">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amity Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username@s.amity.edu"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your Amity University email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Log In"}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary font-medium">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </SharedLayout>
  );
};

export default Login;
