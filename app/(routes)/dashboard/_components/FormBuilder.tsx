"use client";
import React, { useState } from "react";
import { Loader } from "lucide-react";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useBuilder } from "@/context/builder-provider";
import Builder from "./Builder";
import BuilderDragOverlay from "./BuilderDragOverlay";

const FormBuilder = () => {
  const { loading, formData } = useBuilder();
  const isPublished = formData?.published;

  if (loading) {
    return (
      <div
        className="w-full 
    flex h-56
     items-center
      justify-center"
      >
        <Loader size="3rem" className="animate-spin" />
      </div>
    );
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isPublished ? false : true
  );
  return (
    <div>
      <DndContext sensors={useSensors(mouseSensor)}>
        <BuilderDragOverlay />

        <SidebarProvider
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          className="h-[calc(100vh_-_64px)] "
          style={
            {
              "--sidebar-width": "300px",
              "--sidbar-height": "40px",
            } as React.CSSProperties
          }
        >
          <Builder {...{ isSidebarOpen }} />
        </SidebarProvider>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
