import React from "react";
import BuilderContextProvider from "@/context/builder-provider";
import FormBuilder from "../../../_components/FormBuilder";

const Builder = () => {
  return (
    <BuilderContextProvider>
      <FormBuilder />
    </BuilderContextProvider>
  );
};

export default Builder;