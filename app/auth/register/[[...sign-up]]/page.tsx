import { SignUp } from "@clerk/nextjs";
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
        redirectUrl="/dashboard"
        appearance={clerkAppearance}
      />
    </AuthPageLayout>
  );
}
