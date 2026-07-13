import { SignIn } from "@clerk/nextjs";
import AuthPageLayout, { clerkAppearance } from "@/components/authentication/AuthPageLayout";

export default function LoginPage() {
  return (
    <AuthPageLayout
      title="Welcome back"
      description="Sign in to your account to continue where you left off."
    >
      <SignIn
        routing="path"
        path="/auth/login"
        signUpUrl="/auth/register"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        appearance={clerkAppearance}
      />
    </AuthPageLayout>
  );
}
