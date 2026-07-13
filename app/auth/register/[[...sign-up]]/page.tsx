import { SignUp } from "@clerk/nextjs";
import AuthPageLayout, { clerkAppearance } from "@/components/authentication/AuthPageLayout";

export default function RegisterPage() {
  return (
    <AuthPageLayout
      title="Create your account"
      description="Join in seconds. Your workspace is ready when you are."
    >
      <SignUp
        routing="path"
        path="/auth/register"
        signInUrl="/auth/login"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        appearance={clerkAppearance}
      />
    </AuthPageLayout>
  );
}
