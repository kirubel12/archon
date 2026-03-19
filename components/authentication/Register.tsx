"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Check, User, Mail, Lock, FileType } from "lucide-react"
import { useRouter } from "next/navigation"

import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
})

interface RegisterProps {
  isOpen?: boolean
  onClose?: () => void
  onSwitchToLogin?: () => void
}

const Register = ({ isOpen = true, onClose, onSwitchToLogin }: RegisterProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const getPasswordScore = React.useCallback((password: string) => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ]
    return checks.reduce((acc, ok) => acc + (ok ? 1 : 0), 0)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const password = form.watch("password")
  const hasPassword = Boolean(password)
  const passwordScore = React.useMemo(
    () => (hasPassword ? getPasswordScore(password ?? "") : 0),
    [getPasswordScore, hasPassword, password]
  )
  const passwordStrength =
    passwordScore <= 1
      ? "Weak"
      : passwordScore === 2
        ? "Fair"
        : passwordScore === 3
          ? "Good"
          : "Strong"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    const { data, error } = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.fullName,
    })
    
    setIsLoading(false)

    if (error) {
      form.setError("root", {
        type: "manual",
        message: error.message || "Failed to create account",
      })
      return
    }

    // Handle success (e.g., close modal, redirect)
    if (onClose) onClose()
    router.push("/dashboard")
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="auth-glass auth-glow overflow-hidden p-0 sm:max-w-[820px]">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-primary/18 via-transparent to-transparent" />
          <DialogHeader className="relative px-6 pb-5 pt-6">
            <DialogTitle className="text-balance text-xl tracking-tight">
              Create your account
            </DialogTitle>
            <DialogDescription className="text-pretty">
              Join in seconds. Your workspace is ready when you are.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="jdoe"
                              className="focus-ring h-11 pr-10"
                              {...field}
                            />
                            <User className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="John Doe"
                              className="focus-ring h-11 pr-10"
                              {...field}
                            />
                            <FileType className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground/50" />
                          </div>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="m@example.com"
                              type="email"
                              className="focus-ring h-11 pr-10"
                              {...field}
                            />
                            <Mail className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="********"
                              className="focus-ring h-11 pr-10"
                              {...field}
                            />
                            <Lock className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted-foreground/50" />
                          </div>
                        </FormControl>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Password strength</span>
                            <span className="font-medium text-foreground/70">
                              {hasPassword ? passwordStrength : ""}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                !hasPassword && "w-0 bg-transparent",
                                passwordScore <= 1
                                  ? "w-1/4 bg-destructive"
                                  : passwordScore === 2
                                    ? "w-2/4 bg-amber-500"
                                    : passwordScore === 3
                                      ? "w-3/4 bg-primary"
                                      : "w-full bg-emerald-500"
                              )}
                            />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="********"
                              className="focus-ring h-11 pr-10"
                              {...field}
                            />
                            <Check
                              className={cn(
                                "pointer-events-none absolute right-3 top-3 h-4 w-4 transition-opacity",
                                field.value && field.value === password
                                  ? "text-green-500 opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {form.formState.errors.root && (
                <div className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                className="h-11 w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </form>
          </Form>
        <div className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onSwitchToLogin?.()
            }}
            className="font-medium text-foreground/80 underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </a>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Register
