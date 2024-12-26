import SideMenu from "../_components/_common/SideMenu";

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="flex h-[calc(100vh_-_65px)] w-full flex-row"
    >
      <div className="flex relative w-[45px]">
        <SideMenu />
      </div>
      {/* Adjusting main content to move slightly to the right */}
      <main className="w-full flex-1 pl-5">{children}</main>
    </div>
  );
}
