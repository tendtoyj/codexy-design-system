"use client";

import type * as React from "react";
import ReactMarkdown, { type Options } from "react-markdown";
import remarkGfm from "remark-gfm";

import "./markdown.css";

type MarkdownProps = {
  children: string;
  className?: string;
  components?: Options["components"];
};

const REMARK_PLUGINS: Options["remarkPlugins"] = [remarkGfm];

const DEFAULT_COMPONENTS: Options["components"] = {
  table: ({ node: _node, ...rest }) => (
    <div className="pds-markdown-table-scroll">
      <table {...rest} />
    </div>
  ),
};

function Markdown({ children, className, components }: MarkdownProps) {
  const merged = components ? { ...DEFAULT_COMPONENTS, ...components } : DEFAULT_COMPONENTS;
  return (
    <div className={["pds-markdown", className].filter(Boolean).join(" ")}>
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS} components={merged}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

function renderMarkdown(text: string): React.ReactNode {
  return <Markdown>{text}</Markdown>;
}

export type { MarkdownProps };
export { Markdown, renderMarkdown };
