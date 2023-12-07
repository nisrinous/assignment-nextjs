import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/input/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const Inputs = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z
    .string()
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .refine((email) => email.includes("@"), {
      message: "Email must contain @ symbol",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  address: z.string(),
  phonenumber: z
    .string()
    .min(7, {
      message: "Phone number must be at least 7 characters",
    })
    .startsWith("0", {
      message: "Phone number must start with 0",
    }),
  referral: z.string(),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof Inputs>>({
    resolver: zodResolver(Inputs),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      address: "",
      phonenumber: "",
      referral: "",
    },
  });
  function onSubmit(data: z.infer<typeof Inputs>) {
    if (data.password !== data.confirmpassword) {
      form.setError("confirmpassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="E-mail" {...field} />
                </FormControl>
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
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="08123456777" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referral Code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Referral code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Sign in
            <span className="sr-only">Sign up</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
