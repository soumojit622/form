import React, { FC } from "react";
import { FormBlockInstance } from "@/@types/form-block.type";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Key } from "lucide-react";

type Props = {
  blocks: FormBlockInstance[];
  responses: {
    formId: number;
    id: number;
    createdAt: Date;
    jsonReponse: string;
  }[];
};

const AllResponds: FC<Props> = ({ blocks, responses }) => {
  const childblockMap = blocks
    .flatMap((block) => block.childblocks || [])
    .reduce((acc, childblock) => {
      if (childblock) {
        acc[childblock.id] = childblock?.attributes?.label || "No label";
      }
      return acc;
    }, {} as Record<string, string>);
  return (
    <div
      className="grid grid-cols-1 
            lg:grid-cols-3
             gap-4 mt-3"
    >
      {responses.map((response) => {
        const parsedResponses = JSON.parse(response.jsonReponse) as {
          id: string;
          responseValue: string;
        };
        return (
          <Card
            key={response.id}
            className="
           bg-white p-3
           mb-2 w-full"
          >
            <CardContent className="pb-0 px-1">
              <div className="space-y-2">
                <div
                  className="pb-2 w-full flex items-center gap-2 border-b
                        border-gray-200
                        "
                >
                  <h4 className="font-semibold">Question/Answer</h4>
                  <span
                    className="text-xs 
                  text-muted-foreground
                  flex items-center"
                  >
                    <Clock className="w-3 h-3" />
                    {new Date(response.createdAt).toLocaleString()}
                  </span>
                </div>

                {Object.entries(parsedResponses).map(([key, value]) => {
                  return (
                    <div key={key} className="flex-col">
                      <div
                        className="font-medium text-base 
                      mb-[2px] text-gray-800"
                      >
                        {childblockMap[key] || "Unknown Field"}
                      </div>
                      <div
                        className="text-sm pl-1
                       text-gray-600"
                      >
                        - {value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AllResponds;
