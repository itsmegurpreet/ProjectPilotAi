"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = loginSchema
  .extend({
    name: z.string().min(2),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue managing delivery plans.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(() => router.push("/dashboard/projects"))}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="you@company.com"
            />
            {form.formState.errors.email ? (
              <p className="text-xs text-rose-600">Invalid email.</p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              placeholder="Enter password"
            />
            {form.formState.errors.password ? (
              <p className="text-xs text-rose-600">Minimum 8 characters.</p>
            ) : null}
          </div>
          <Button className="w-full" type="submit">
            Sign in
          </Button>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            No account?{" "}
            <Link href="/register" className="text-sky-600">
              Create one
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Start turning requirements into delivery plans.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(() => router.push("/dashboard/projects"))}
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              {...form.register("email")}
              placeholder="you@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              {...form.register("password")}
              placeholder="Choose a password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              {...form.register("confirmPassword")}
              placeholder="Repeat password"
            />
            {form.formState.errors.confirmPassword ? (
              <p className="text-xs text-rose-600">
                {form.formState.errors.confirmPassword.message}
              </p>
            ) : null}
          </div>
          <Button className="w-full" type="submit">
            Create account
          </Button>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already registered?{" "}
            <Link href="/login" className="text-sky-600">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
