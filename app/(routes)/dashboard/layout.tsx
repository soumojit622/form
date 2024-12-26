import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/_common/Header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <Header />
      <div className="w-full flex-1">
        <div>{children}</div>
      </div>
    </div>
  );
}