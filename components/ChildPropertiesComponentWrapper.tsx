import { FormBlockInstance } from "@/@types/form-block.type";
import { FormBlocks } from "@/lib/form-blocks";
import React from "react";

const ChildPropertiesComponentWrapper = ({
  index,
  parentId,
  blockInstance,
}: {
  index: number;
  parentId: string;
  blockInstance: FormBlockInstance;
}) => {
  const PropertiesComponent =
    FormBlocks[blockInstance.blockType].propertiesComponent;
  if (!PropertiesComponent) return null;

  return (
    <PropertiesComponent
      positionIndex={index}
      parentId={parentId}
      blockInstance={blockInstance}
    />
  );
};

export default ChildPropertiesComponentWrapper;