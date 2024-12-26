import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import React from "react";

const NotAvaliable = () => {
  return (
    <div
      className="h-screen flex flex-col 
    items-center space-y-4 justify-center"
    >
      <div className="flex-1">
        <Frown size="80px" />
        <h2 className="text-xl font-semibold">
          This Form is no longer available
        </h2>
        <Button className="min-w-64">Learn more</Button>
      </div>

      <div
        className="shrink-0 
      min-h-14 text-center"
      >
        <p className="text-xs">Company by</p>
        <h5
          className="font-black 
         text-[20px] text-primary"
        >
          {" "}
          Formy.ai
        </h5>
      </div>
    </div>
  );
};

export default NotAvaliable;
