import { currentUser } from "@clerk/nextjs/server";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardClient from "../../components/dashboard/DashboardClient";

export default async function Dashboard() {
  const user = await currentUser();
  const name =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses[0]?.emailAddress ||
    "there";

  return (
    <DashboardLayout>
      <DashboardClient name={name} />
    </DashboardLayout>
  );
}
