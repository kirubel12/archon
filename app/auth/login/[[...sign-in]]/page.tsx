import { SignIn } from "@clerk/nextjs";
import AuthPageLayout from "@/components/authentication/AuthPageLayout";

const clerkAppearance = {
  elements: {
    rootBox: "w-full",
    card: "w-full bg-transparent shadow-none",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    socialButtonsBlockButton:
      "border-border bg-background text-foreground hover:bg-muted focus-ring rounded-md",
    formFieldInput:
      "bg-background border-border text-foreground focus:ring-ring focus-ring rounded-md",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-ring rounded-md",
    footerActionLink: "text-primary hover:text-primary/80 focus-ring",
    identityPreviewEditButton: "text-primary focus-ring",
  },
};

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
        redirectUrl="/dashboard"
        appearance={clerkAppearance}
      />
    </AuthPageLayout>
  );
}
