"use client";
import { cn } from "@/lib/utils";
import { Blocks, LucideIcon, MessageSquare } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

type NavType = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const SideMenu = () => {
  const { formId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const navMenus: NavType[] = [
    {
      title: "Builder",
      url: `/dashboard/form/builder/${formId}`,
      icon: Blocks,
    },
    {
      title: "Responds",
      url: `/dashboard/form/responds/${formId}`,
      icon: MessageSquare,
    },
  ];

  return (
    <div
      className="fixed h-screen z-40 w-[60px] pt-5 border-r shadow-md bg-[#4d2e84] text-white"
    >
      <ul className="flex flex-col items-center gap-6 mt-4">
        {navMenus.map((item) => (
          <li key={item.title}>
            <button
              className={cn(
                `
                  flex flex-col items-center gap-2 p-3 rounded-lg
                  transition-colors duration-300 ease-in-out
                  hover:bg-[#5a3a94] hover:text-white
                `,
                {
                  "bg-white text-[#4d2e84]": item.url === pathname,
                }
              )}
              onClick={() => {
                router.push(item.url);
              }}
            >
              <item.icon className="w-6 h-6" />
              <span className="sr-only">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
