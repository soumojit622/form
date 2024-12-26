"use client";
import React from "react";
import Link from "next/link";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOutIcon } from "lucide-react";
import Logo from "@/components/logo";

const Header = () => {
  const { user } = useKindeBrowserClient();

  const pathname = usePathname();
  const { formId } = useParams();

  const NAV_MENUS = [
    {
      name: "Dashboard",
      pathname: "/dashboard",
      isDisabled: false,
    },
    {
      name: "Builder",
      pathname: `/dashboard/form/builder/${formId}`,
      isDisabled: true,
    },
    {
      name: "Responds",
      pathname: `/dashboard/form/responds/${formId}`,
      isDisabled: true,
    },
    {
      name: "Settings",
      pathname: "#",
      isDisabled: false,
    },
  ];

  return (
    <header
      className="
    sticky top-0 z-50 flex h-16 items-center gap-4 
    !bg-[#43217c] px-4 md:px-6
    "
    >
      <nav
        className="gap-6 w-full h-full
           text-lg font-medium flex justify-between flex-row"
      >
        <div
          className="flex flex-1 items-center mr-5 pr-8 
         border-r border-gray-600"
        >
          <Logo url="/dashboard" />
          <span className="sr-only">Formy</span>
        </div>
        <ul className="hidden md:flex flex-row">
          {NAV_MENUS.map((item, idx) => (
            <li key={idx} className="relative h-full">
              <Link
                href={item.pathname}
                className={cn(
                  `
                    text-white/90 text-[15.5px]
              font-normal z-[999] flex items-center px-3
              justify-center h-full transition-colors 
              hover:text-opacity-90
                        `,
                  {
                    "opacity-80 !pointer-events-none": item.isDisabled,
                  }
                )}
              >
                {item.name}
              </Link>
              {pathname == item.pathname && (
                <div
                  className="absolute 
                          top-0 
                          left-0
                          right-0 
                          h-[52px]
                          bg-primary
                          transition-colors
                          ease-in-out
                          rounded-b-xl
                          -z-[1]"
                />
              )}
            </li>
          ))}
        </ul>

        <div
          className="flex 
        items-center gap-1
        justify-end w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                role="button"
                className="flex
              items-start gap-2
              "
              >
                <Avatar
                  className="h-8 w-8 bg-gray-200 shrink-0 
                rounded-full"
                >
                  <AvatarImage
                    src={user?.picture || ""}
                    alt={user?.given_name || ""}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.given_name?.charAt(0)}
                    {user?.family_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <div
                    className="grid flex-1 text-left text-sm 
                  leading-tight
                  "
                  >
                    <span className="truncate font-semibold text-[#f2f2f2]">
                      {user?.given_name} {user?.family_name}
                    </span>
                    <p
                      className="truncate 
                        block 
                        w-full 
                        max-w-[150px] text-xs
                     text-white/50"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ChevronDown className="ml-auto size-4 text-white/80" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogoutLink className="flex items-center gap-1">
                  <LogOutIcon className="w-4 h-4"/>
                  Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;