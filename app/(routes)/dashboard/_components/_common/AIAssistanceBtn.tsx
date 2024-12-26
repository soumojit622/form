"use client";
import { FormBlockInstance } from "@/@types/form-block.type";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useBuilder } from "@/context/builder-provider";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai";
import { generateUniqueId } from "@/lib/helper";
import { generateFormQuestionPrompt } from "@/lib/prompts";
import { Loader, Sparkles } from "lucide-react";
import React, { useState } from "react";

const AIAssistanceBtn = () => {
  const { formData, blockLayouts, setBlockLayouts } = useBuilder();
  const [userRequest, setUserRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const isPublished = formData?.published;

  const GenerateFormQuestionsWithAI = async () => {
    if (!userRequest) {
      toast({
        title: "⚠️ Please enter a request",
      });
      return;
    }
    try {
      setLoading(true);
      const formName = formData?.name || "";
      const formDescription = formData?.description || "";

      const PROMPT = generateFormQuestionPrompt(
        userRequest,
        formName,
        formDescription,
        blockLayouts
      );

      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON?.parse(responseText);
      const actionType = parsedResponse.actionType;
      const generatedBlocks = parsedResponse.blocks;
      const addUniqueIdToGeneratedBlocks = addUniqueIds(generatedBlocks);

      setBlockLayouts((prevBlocks) => {
        if (actionType === "addQuestions") {
          return [...prevBlocks, ...addUniqueIdToGeneratedBlocks];
        } else if (actionType === "createForm") {
          return [...addUniqueIdToGeneratedBlocks];
        } else {
          console.warn(`Unhandled actionType: ${actionType}`);
          return prevBlocks;
        }
      });
      setIsOpen(false);
      setUserRequest("");
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "❌ Failed to generate questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  function addUniqueIds(blocks: FormBlockInstance[]) {
    blocks.forEach((block) => {
      block.id = generateUniqueId();
      block?.childblocks?.forEach((child) => {
        child.id = generateUniqueId();
      });
    });
    return blocks;
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-lg !bg-primary/20 
            border-none p-4 shadow-sm"
            aria-label="AI assistance"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          forceMount
          align="start"
          side="right"
        >
          <div
            className="
          flex flex-col  
          w-[390px] bg-white border-2 border-purple-200 
          rounded-lg px-5  pb-[14px] pt-[18px] shadow-xl
          "
          >
            <div className="flex relative">
              <div
                className="pb-5 sm:pb-0 
                flex w-full overflow-x-auto 
                overflow-y-hidden scrollbar-hide 
              border-b border-gray-200"
              >
                <div className="block mx-4 !ml-0">
                  <nav className="flex space-x-6 -mb-px">
                    <a
                      className="inline-flex items-center
                     px-1 pb-2 text-xs font-medium
                      text-primary border-b-2"
                    >
                      ✨ Ask to generate form or questions
                    </a>
                  </nav>
                </div>
              </div>
              <div
                className="flex absolute top-0 
              right-0  -mt-[6px] whitespace-nowrap
              text-xs py-1 px-[6px] bg-gray-100
              rounded-md text-gray-600"
              >
                Beta 🚀
              </div>
            </div>

            <div className="mt-[22px]">
              <Textarea
                value={userRequest}
                rows={4}
                readOnly={isPublished}
                className="shadow-sm block w-full 
                sm:text-sm border-gray-300 rounded-md 
                focus:ring-primary"
                placeholder="Describe the form or questions you want to generate with AI..."
                spellCheck="false"
                onChange={(e) => {
                  setUserRequest(e.target.value);
                }}
              />
            </div>

            <div
              className="flex 
            justify-between
            items-center mt-4"
            >
              <div
                role="button"
                className=" text-purple-400 
                font-medium underline text-sm ml-1"
                onClick={() => setShow(!show)}
              >
                {show ? "🔽 Hide tips" : "🔍 Tips"}
              </div>

              <Button
                type="button"
                size="sm"
                className="!px-3 !font-medium 
                !py-2"
                disabled={loading || isPublished}
                onClick={GenerateFormQuestionsWithAI}
              >
                ✨ Generate 
                {loading && <Loader size="15px" className="animate-spin" />}
              </Button>
            </div>

            {show && (
              <div
                className="flex 
              flex-col
              rounded border
               border-purple-300
                bg-purple-100
                 text-purple-500
                 px-3 pt-3
                 mt-2
                 mb-1"
              >
                <div
                  className="flex 
                font-semibold text-sm mb-1"
                >
                  💡 Let the AI know:
                </div>
                <ul
                  className="tips-options 
                text-sm mx-4 space-y-2 pb-2"
                >
                  <li>📋 What form you want it to create (e.g., a booking form for a hotel)?</li>
                  <li>💬 What information you'd like to collect (e.g., email, name, description)?</li>
                  <li>🎭 What tone you'd like the questions in (e.g., formal, informal)?</li>
                  <li>🔢 How many questions you'd like to include?</li>
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AIAssistanceBtn;
