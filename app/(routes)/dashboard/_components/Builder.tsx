import React from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { defaultBackgroundColor } from "@/constant";
import BuilderSidebar from "./BuilderSidebar";
import BuilderCanvas from "./BuilderCanvas";
import BuilderBlockProperties from "./BuilderBlockProperties";
import FloatingShareButton from "./_common/FloatingShareButton";

const Builder = (props: { isSidebarOpen: boolean }) => {
  return (
    <>
      <BuilderSidebar />
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: defaultBackgroundColor,
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          <BuilderCanvas />
          <FloatingShareButton isSidebarOpen={props.isSidebarOpen} />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
};

export default Builder;