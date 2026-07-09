import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import ThemeToggle from "../../components/ThemeToggle";

export default async function Dashboard() {
  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses[0]?.emailAddress ||
    "there";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Archon
        </Link>
       <div className="flex items-center gap-4">
         <ThemeToggle />
        <UserButton />
       </div>
      </header>

      <main className="px-4 pt-6 pb-8 md:px-8 md:pt-8 md:pb-12">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to your secure Archon workspace, {name}.
        </p>
      </main>
    </div>
  );
}
