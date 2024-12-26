"use client";
import { FormBlockInstance } from "@/@types/form-block.type";
import { FormWithSettings } from "@/@types/form.type";
import { generateUniqueId } from "@/lib/helper";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type BulderContextType = {
  loading: boolean;
  formData: FormWithSettings | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;

  blockLayouts: FormBlockInstance[];
  setBlockLayouts: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
  addBlockLayout: (blockLayout: FormBlockInstance) => void;

  removeBlockLayout: (id: string) => void;
  duplicateBlockLayout: (id: string) => void;

  selectedBlockLayout: FormBlockInstance | null;
  handleSeletedLayout: (blockLayout: FormBlockInstance | null) => void;

  updateBlockLayout: (id: string, childrenBlocks: FormBlockInstance[]) => void;

  repositionBlockLayout: (
    activeId: string,
    overId: string,
    position: "above" | "below"
  ) => void;

  insertBlockLayoutAtIndex: (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below"
  ) => void;

  updateChildBlock: (
    parentId: string,
    childblockId: string,
    updatedBlock: FormBlockInstance
  ) => void;
};

export const BuilderContext = createContext<BulderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const formId = params.formId as string;

  const [formData, setFormData] = useState<FormWithSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const [blockLayouts, setBlockLayouts] = useState<FormBlockInstance[]>([]);

  const [selectedBlockLayout, setSeletedBlockLayout] =
    useState<FormBlockInstance | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!formId) return;
        const response = await fetch(`/api/fetchFormById?formId=${formId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const { data } = await response.json();
        const { form } = data;
        if (form) {
          console.log(form, "form useeffect");
          setFormData(form);

          // Parse `blocks` from the form's `jsonBlocks`
          if (form.jsonBlocks) {
            const parsedBlocks = JSON.parse(form.jsonBlocks);
            setBlockLayouts(parsedBlocks);
          }
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  const addBlockLayout = (blockLayout: FormBlockInstance) => {
    setBlockLayouts((prev) => {
      const updatedBlock = [...prev];
      updatedBlock.push(blockLayout);
      return updatedBlock;
    });
  };

  // B.S -> DUPLICATE BLOCK LAYOUT
  const duplicateBlockLayout = (id: string) => {
    setBlockLayouts((prevBlocks) => {
      const blockToDuplicate = prevBlocks.find((block) => block.id === id);
      if (!blockToDuplicate) return prevBlocks;
      // Deep clone the block and generate a new id

      const duplicatedLayoutBlock = {
        ...blockToDuplicate,
        id: `layout-${generateUniqueId()}`,
        childblocks: blockToDuplicate.childblocks?.map((childblock) => ({
          ...childblock,
          id: generateUniqueId(),
        })),
      };

      // Add the duplicated block after the original block
      const updatedBlockLayouts = [...prevBlocks];
      const insertIndex = prevBlocks.findIndex((block) => block.id === id) + 1;
      updatedBlockLayouts.splice(insertIndex, 0, duplicatedLayoutBlock);

      return updatedBlockLayouts;
    });
  };

  // B.S -> REMOVE BLOCK LAYOUT
  const removeBlockLayout = (id: string) => {
    setBlockLayouts((prev) => prev.filter((block) => block.id !== id));
    if (selectedBlockLayout?.id === id) setSeletedBlockLayout(null);
  };

  const handleSeletedLayout = (blockLayout: FormBlockInstance | null) => {
    setSeletedBlockLayout(blockLayout);
  };

  // B.S -> REPOSTION BLOCK LAYOUT
  const repositionBlockLayout = (
    activeId: string,
    overId: string,
    position: "above" | "below"
  ) => {
    setBlockLayouts((prev) => {
      // Find the indices of the active and over blocks
      const activeIndex = prev.findIndex((block) => block.id === activeId);
      const overIndex = prev.findIndex((block) => block.id === overId);

      if (activeIndex === -1 || overIndex === -1) {
        console.warn("Active or Over block not found.");
        return prev;
      }

      // Remove the active block from its current position
      const updatedBlocks = [...prev];
      const [movedBlock] = updatedBlocks.splice(activeIndex, 1);
      // Calculate the new position for insertion
      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      // Insert the moved block at the calculated position
      updatedBlocks.splice(insertIndex, 0, movedBlock);

      return updatedBlocks;
    });
  };

  // B.S -> INSERT NEW LAYOUT IN A PARTICULAR INDEX ON CANVAS
  const insertBlockLayoutAtIndex = (
    overId: string,
    newBlockLayout: FormBlockInstance,
    position: "above" | "below"
  ) => {
    setBlockLayouts((prev) => {
      const overIndex = prev.findIndex((block) => block.id === overId);
      if (overIndex == -1) {
        return prev;
      }

      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      const updatedBlocks = [...prev];
      updatedBlocks.splice(insertIndex, 0, newBlockLayout);
      return updatedBlocks;
    });
  };

  const updateBlockLayout = (
    id: string,
    childrenBlocks: FormBlockInstance[]
  ) => {
    setBlockLayouts((prev) =>
      prev.map((block) =>
        block.id === id
          ? {
              ...block,
              childblocks: childrenBlocks,
            }
          : block
      )
    );
  };

  const updateChildBlock = (
    parentId: string,
    childblockId: string,
    updatedBlock: FormBlockInstance
  ) => {
    setBlockLayouts((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((parentBlock) => {
        if (parentBlock.id === parentId) {
          const updatedChildblocks = parentBlock.childblocks?.map(
            (childblock) =>
              childblock.id === childblockId
                ? { ...childblock, ...updatedBlock }
                : childblock
          );
          return { ...parentBlock, childblocks: updatedChildblocks };
        }

        return parentBlock;
      });

      return updatedBlocks;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blockLayouts,
        setBlockLayouts,
        addBlockLayout,
        removeBlockLayout,
        duplicateBlockLayout,
        selectedBlockLayout,
        handleSeletedLayout,
        repositionBlockLayout,
        insertBlockLayoutAtIndex,
        updateBlockLayout,
        updateChildBlock,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("Use Context inside the provider");
  }
  return context;
}
