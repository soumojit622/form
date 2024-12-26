"use client";
import React, { useRef, useState } from "react";
import { FormBlockInstance } from "@/@types/form-block.type";
import { Button } from "@/components/ui/button";
import { FormBlocks } from "@/lib/form-blocks";
import { Loader } from "lucide-react";
import Logo from "@/components/logo";
import { toast } from "@/hooks/use-toast";
import { submitResponse } from "@/actions/form.action";
import { Card, CardContent } from "@/components/ui/card";

const FormSubmitComponent = (props: {
  formId: string;
  blocks: FormBlockInstance[];
}) => {
  const { formId, blocks } = props;

  const formVals = useRef<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setSubmitted] = useState<boolean>(false);

  // Validate all fields
  const validateFields = () => {
    const errors: { [key: string]: string } = {};
    blocks.forEach((block) => {
      if (!block.childblocks) return;
      block.childblocks?.forEach((childblock) => {
        const required = childblock.attributes?.required;
        const blockValue = formVals.current?.[childblock.id]?.trim();

        // Check if field is required and empty
        if (required && (!blockValue || blockValue.trim() === "")) {
          errors[childblock.id] = "This Field is required";
        }
      });
    });
    setFormErrors(errors); // Update state with errors
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleBlur = (key: string, value: string) => {
    formVals.current[key] = value;

    if (formErrors[key] && value?.trim() !== "") {
      setFormErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[key]; // Remove the key from errors
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      toast({
        title: "Validation Error",
        description: "Must fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const responseJson = JSON.stringify(formVals.current);
      const response = await submitResponse(formId, responseJson);
      if (response.success) {
        setSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="scrollbar w-full h-full
  overflow-y-auto pt-3 transition-all duration-300
  "
    >
      <div
        className="w-full h-full 
      max-w-[650px] mx-auto"
      >
        <div
          className="w-full relative 
          bg-transparent px-2
            flex flex-col 
            items-center 
            justify-start pt-1 
            pb-14"
        >
          <div
            className="w-full mb-3
             bg-white bg-[url(/images/form-bg.jpg)] 
             bg-center bg-cover border shadow-sm 
             h-[135px] max-w-[768px]
          rounded-md px-1"
          />

          <div className="w-full h-auto">
            {isSubmitted ? (
              <Card
                className="w-full bg-white border
               shadow-sm min-h-[120px] rounded-md !p-0"
              >
                <CardContent className="px-2 pb-2">
                  <div className="py-4 px-3">
                    <h1 className="text-4xl font-normal">Thank You</h1>
                    <p className="mt-2 mb-8 text-base">
                      Got it, We'll notify you with a feedback
                    </p>
                    <a
                      href="#"
                      className="outline-none 
                      underline text-sm  text-blue-700"
                    >
                      Learn more for more information
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              blocks.length > 0 && (
                <div className="flex flex-col w-full gap-4">
                  {blocks.map((block) => {
                    const FormBlockComponent =
                      FormBlocks[block.blockType].formComponent;

                    return (
                      <FormBlockComponent
                        key={block.id}
                        blockInstance={block}
                        handleBlur={handleBlur}
                        formErrors={formErrors}
                      />
                    );
                  })}
                  <div className="w-ful">
                    <Button
                      className="!bg-primary"
                      disabled={isLoading}
                      onClick={handleSubmit}
                    >
                      {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                      Submit
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>

          <div
            className="flex items-center 
          flex-col gap-2
          justify-center
          mt-5"
          >
            <p className="text-xs ">Never submit passwords through Formy.ai.</p>
            <Logo url="#" color="!text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
