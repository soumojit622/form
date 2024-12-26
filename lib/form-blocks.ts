import { FormBlocksType } from "@/@types/form-block.type";
import { HeadingBlock } from "@/components/blocks/HeadingBlock";
import { RowLayoutBlock } from "@/components/blocks/layouts/RowLayout";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { RadioSelectBlock } from "@/components/blocks/RadioSelectBlock";
import { StarRatingBlock } from "@/components/blocks/StarRatingBlock";
import { TextAreaBlock } from "@/components/blocks/TextAreaBlock";
import { TextFieldBlock } from "@/components/blocks/TextField";

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  Heading: HeadingBlock,
  Paragraph: ParagraphBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  RadioSelect: RadioSelectBlock,
  StarRating: StarRatingBlock
}