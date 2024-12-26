"use client";
import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { FormBlockType } from "@/@types/form-block.type";
import { useBuilder } from "@/context/builder-provider";
import BlockBtnDragOverlay from "@/components/BlockBtnDragOverlay";
import { FormBlocks } from "@/lib/form-blocks";

const BuilderDragOverlay = () => {
  const { blockLayouts } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      console.log("ITEM DRAG", event);
      setDraggedItem(event.active);
    },
    onDragCancel() {
      console.log("ITEM DRAG CANCEL");
      setDraggedItem(null);
    },
    onDragEnd() {
      console.log("ITEM DRAG CANCEL");
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let fallbackNode = <div>No block drag</div>;
  const isBlockBtnElement = draggedItem?.data?.current?.isBlockBtnElement;
  const isCanvasLayout = draggedItem?.data?.current?.isCanvasLayout;

  if (isBlockBtnElement) {
    const blockType = draggedItem?.data?.current?.blockType as FormBlockType;
    fallbackNode = <BlockBtnDragOverlay formBlock={FormBlocks[blockType]} />;
  }

  if (isCanvasLayout) {
    const blockId = draggedItem.data?.current?.blockId;
    const blockLayout = blockLayouts.find(
      (blockLayout) => blockLayout.id === blockId
    );
    if (!blockLayout) fallbackNode = <div>No block drag</div>;
    else {
      const CanvasBlockComponent =
        FormBlocks[blockLayout.blockType].canvasComponent;
      fallbackNode = (
        <div className="pointer-events-none">
          <CanvasBlockComponent blockInstance={blockLayout} />
        </div>
      );
    }
  }

  return (
    <DragOverlay>
      <div className="opacity-95">{fallbackNode}</div>
    </DragOverlay>
  );
};

export default BuilderDragOverlay;