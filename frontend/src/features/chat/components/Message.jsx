import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

//remark plugins
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

//rehype plugins 
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import { useSelector } from "react-redux";

const Message = ({ role, content, time, shouldAnimate = false, isPending = false }) => {

  const auth=useSelector((state)=>state.auth.user)

  const isUser = role === "user";
  const shouldTypewrite = !isUser && shouldAnimate;
  const [displayedText, setDisplayedText] = useState(shouldTypewrite ? "" : content);

useEffect(() => {
  if (!content) return;
  if (!shouldTypewrite) {
    setDisplayedText(content);
    return;
  }

  let index = 0;
  const charactersPerTick = content.length > 1200 ? 18 : content.length > 500 ? 12 : 7;

  const interval = setInterval(() => {
    index = Math.min(index + charactersPerTick, content.length);
    setDisplayedText(content.slice(0, index));

    if (index >= content.length) {
      clearInterval(interval);
    }
  }, 12);

  return () => clearInterval(interval);
}, [content, shouldTypewrite]);

  const isLongMessage = content.length > 80 || content.includes("\n") || content.includes(<br/>);
  const markdownComponents = {
    h1: ({ children }) => <h1 className="mb-4 mt-6 border-b border-white/10 pb-2 text-2xl font-semibold leading-9 text-white first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 text-xl font-semibold leading-8 text-white first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-5 text-lg font-semibold leading-7 text-[#d8d0ff] first:mt-0">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-4 text-base font-semibold leading-6 text-[#d8d0ff] first:mt-0">{children}</h4>,
    p: ({ children }) => <p className="mb-3 leading-7 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-[#b7a7ff] underline underline-offset-4 transition hover:text-white"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="mb-4 list-disc space-y-1.5 pl-6 marker:text-[#9b83ff] last:mb-0">{children}</ul>,
    ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-[#9b83ff] last:mb-0">{children}</ol>,
    li: ({ children }) => <li className="pl-1 leading-7 marker:text-sm">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 rounded-r-lg border-l-2 border-[#8b6cf1] bg-white/[0.03] py-2 pl-4 text-white/75 last:mb-0">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-6 border-white/10" />,
    pre: ({ children }) => {
      const codeClassName = children?.props?.className || ""
      const language = codeClassName.match(/language-([\w-]+)/)?.[1]

      return (
        <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-[#211C28]  shadow-[0_16px_44px_rgba(0,0,0,0.28)] last:mb-0">
          <div className="flex h-9 items-center justify-between border-b border-white/10 bg-[#3A3148] px-4">
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/45">
              {language || "code"}
            </span>
          </div>
          <pre className="max-w-full overflow-x-auto p-4 text-[13px] leading-6">
            {children}
          </pre>
        </div>
      )
    },

    code: ({ className, children, ...props }) => {
      const isBlockCode = className?.includes("language-") || className?.includes("hljs")

      if (isBlockCode) {
        return (
          <code className={`${className || ""} font-mono text-[#e6edf3]`} {...props}>
            {children}
          </code>
        )
      }

      return (
        <code className="rounded-md border border-white/10 bg-[#24212b] px-1.5 py-0.5 font-mono text-[0.9em] text-[#f0eaff]" {...props}>
          {children}
        </code>
      )
    },
    table: ({ children }) => (
      <div className="mb-4 max-w-full overflow-x-auto rounded-lg border border-white/10 last:mb-0">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border-b border-r border-white/10 bg-[#211b2d] px-4 py-3 font-semibold text-white last:border-r-0">{children}</th>,
    td: ({ children }) => <td className="border-b border-r border-white/10 px-4 py-3 align-top text-white/85 last:border-r-0">{children}</td>,
  }
  // console.log(content)

  return (
    <div className={`flex ${isUser ? "justify-end " : "justify-start"}`}>

      {!isUser && (
        <div className="mt-2 w-10 h-10 flex h-10 w-1
        0 shrink-0 items-center justify-center rounded-full bg-[#18161A]">
          <p className=" text-xl text-white/70  font-thin">ξ</p>
        </div>
      )}

      <div
  className={` ${
    isUser
      ? "mr-3 bg-[#30283d]/30 max-w-[65vw] px-5  lg:max-w-[30vw]"
      : "ml-1 max-w-[80vw]"
  } min-w-0 overflow-hidden flex items-start justify-center ${
    isLongMessage ? "rounded-xl px-5 py-4" : "lg:rounded-full md:rounded-full rounded-full px-4 py-2"
  }`}
>
  <div className={`markdown-body min-w-0 text-start break-words [overflow-wrap:anywhere] text-[15px] leading-7 ${
    isPending ? "pending-message-text" : "text-white/90"
  }`}>
  <ReactMarkdown
  remarkPlugins={[
    remarkGfm,
    remarkMath,
    remarkToc,
  ]}
  rehypePlugins={[
    rehypeRaw,
    rehypeSanitize,
    rehypeSlug,
    rehypeAutolinkHeadings,
    rehypeKatex,
    [rehypeHighlight, { detect: true, ignoreMissing: true }],
  ]}
  components={markdownComponents}
>
  {displayedText}
</ReactMarkdown>

  </div>

      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7b5be6] text-md  font-semibold text-white">
          {(auth.username[0]).toUpperCase()}
        </div>
      )}

    </div>
  );
};

export default Message;
