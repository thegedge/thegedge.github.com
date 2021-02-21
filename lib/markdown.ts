import frontmatter from "@github-docs/frontmatter";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import unified from "unified";
import { Parent as Node } from "unist";
import readingTimes from "./unified-plugins/reading-times";
import tableHeadsAndBodies from "./unified-plugins/table-heads-and-bodies";

export interface MarkdownData {
  node: MarkdownNodes;
  frontmatter: Record<string, any>;
  source: string;
}

export type MarkdownNodes =
  | MarkdownBlockquote
  | MarkdownCode
  | MarkdownDescriptionList
  | MarkdownDescriptionDetails
  | MarkdownDescriptionTerm
  | MarkdownEmphasis
  | MarkdownHeading
  | MarkdownHtml
  | MarkdownImage
  | MarkdownInlineCode
  | MarkdownInlineMath
  | MarkdownLink
  | MarkdownList
  | MarkdownListItem
  | MarkdownMath
  | MarkdownParagraph
  | MarkdownRoot
  | MarkdownStrong
  | MarkdownTable
  | MarkdownTableBody
  | MarkdownTableCell
  | MarkdownTableHead
  | MarkdownTableRow
  | MarkdownText
  | MarkdownThematicBreak;

// Standard markdown elements

export interface MarkdownBlockquote extends Node {
  type: "blockquote";
}

export interface MarkdownInlineCode extends Node {
  type: "inlineCode";
  value: string;
}

export interface MarkdownCode extends Node {
  type: "code";
  lang: string;
  value: string;
}

export interface MarkdownEmphasis extends Node {
  type: "emphasis";
}

export interface MarkdownHeading extends Node {
  type: "heading";
  depth: number;
}

export interface MarkdownHtml extends Node {
  type: "html";
  value: string;
}

export interface MarkdownInlineMath extends Node {
  type: "inlineMath";
  value: string;
}

export interface MarkdownImage extends Node {
  type: "image";
  url: string;
  alt: string;
}

export interface MarkdownLink extends Node {
  type: "link";
  url: string;
  title: string;
}

export interface MarkdownList extends Node {
  type: "list";
  ordered: boolean;
  start: number;
  spread: boolean;
}

export interface MarkdownListItem extends Node {
  type: "listItem";
  ordered: boolean;
  checked?: boolean;
  spread: boolean;
}

export interface MarkdownMath extends Node {
  type: "math";
  value: string;
}

export interface MarkdownParagraph extends Node {
  type: "paragraph";
}

export interface MarkdownRoot extends Node {
  type: "root";
}

export interface MarkdownStrong extends Node {
  type: "strong";
}

export interface MarkdownTable extends Node {
  type: "table";
  align: ("left" | "right" | "center" | null)[];
}

export interface MarkdownTableBody extends Node {
  type: "tableBody";
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownTableCell extends Node {
  type: "tableCell";
  align?: "left" | "right" | "center";
  isHeader?: boolean;
}

export interface MarkdownTableHead extends Node {
  type: "tableHead";
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownTableRow extends Node {
  type: "tableRow";
  isHeader?: boolean;
  align?: ("left" | "right" | "center")[];
}

export interface MarkdownText extends Node {
  type: "text";
  value: string;
}

export interface MarkdownThematicBreak extends Node {
  type: "thematicBreak";
}

// From remark-deflist

export interface MarkdownDescriptionDetails extends Node {
  type: "descriptiondetails";
}

export interface MarkdownDescriptionList extends Node {
  type: "descriptionlist";
}

export interface MarkdownDescriptionTerm extends Node {
  type: "descriptionterm";
}

export function parse(source: string): MarkdownData {
  const fm = frontmatter(source);
  const markdown = fm.content;
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkDeflist)
    .use(tableHeadsAndBodies)
    .use(readingTimes);

  return {
    node: processor.runSync(processor.parse(markdown)) as MarkdownNodes,
    frontmatter: fm.data,
    source: fm.content,
  };
}
