"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { useBuilder } from "@/context/builder-provider";
import { saveForm } from "@/actions/form.action";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SaveFormBtn = () => {
  const { formData, setFormData, blockLayouts } = useBuilder();
  const formId = formData?.formId;

  const [isLoading, setIsLoading] = useState(false);

  const saveFormData = async () => {
    try {
      if (!formId) return;
      setIsLoading(true);

      const lockedBlockLayout = blockLayouts.find((block) => block.isLocked);

      const name = lockedBlockLayout?.childblocks?.find(
        (child) => child.blockType === "Heading"
      )?.attributes?.label as string;

      const description = lockedBlockLayout?.childblocks?.find(
        (child) => child.blockType === "Paragraph"
      )?.attributes?.text as string;

      const jsonBlocks = JSON.stringify(blockLayouts);

      const response = await saveForm({
        formId,
        name,
        description,
        jsonBlocks,
      });

      if (response?.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        if (response.form) {
          setFormData({
            ...formData,
            ...response.form,
          });
        }
      } else {
        toast({
          title: "Error",
          description: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoading || formData?.published}
      className={cn(
        `
        !text-primary
        !bg-primary/10 !border-primary
            `,
        formData?.published && "cursor-default pointer-events-none"
      )}
      onClick={saveFormData}
    >
      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save />}
      Save
    </Button>
  );
};

export default SaveFormBtn;
