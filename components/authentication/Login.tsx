"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

import { signIn } from "@/lib/auth-client"
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
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
})

interface LoginProps {
  isOpen?: boolean
  onClose?: () => void
  onSwitchToRegister?: () => void
}

const Login = ({ isOpen = true, onClose, onSwitchToRegister }: LoginProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    const { data, error } = await signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    })
    
    setIsLoading(false)

    if (error) {
      form.setError("root", {
        type: "manual",
        message: error.message || "Invalid credentials",
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
      <DialogContent className="auth-glass auth-glow overflow-hidden p-0 sm:max-w-[480px]">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-primary/18 via-transparent to-transparent" />
          <DialogHeader className="relative px-6 pb-5 pt-6">
            <DialogTitle className="text-balance text-xl tracking-tight">
              Welcome back
            </DialogTitle>
            <DialogDescription className="text-pretty">
              Sign in to your account to continue where you left off.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-1 sm:gap-5">
                <div className="space-y-4">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <a
                  href="#"
                  className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  Forgot password?
                </a>
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
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mt-5 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onSwitchToRegister?.()
              }}
              className="font-medium text-foreground/80 underline underline-offset-4 hover:text-primary"
            >
              Create an account
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Login