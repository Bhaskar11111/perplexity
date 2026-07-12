import React from "react";
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'
import ReactMarkdown from "react-markdown";

//remark plugins
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

//rehype plugins 
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'

const Message = ({ role, content, time }) => {
  const isUser = role === "user";
  const isLongMessage = content.length > 80 || content.includes("\n");
  // console.log(content)

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      {!isUser && (
        <div className="mt-2 w-10 h-10 flex h-10 w-1
        0 shrink-0 items-center justify-center rounded-full bg-[#18161A]">
          <p className=" text-xl text-white/70 rotate-7 font-thin">ξ</p>
        </div>
      )}

      <div
  className={` ${
    isUser
      ? "mr-3 bg-[#30283d]/30 max-w-[30vw]"
      : "ml-3 max-w-[60vw]"
  } min-w-0 overflow-hidden flex items-center justify-center ${
    isLongMessage ? "rounded-xl px-5 py-4" : "rounded-full px-4 py-2"
  }`}
>
  <div className="min-w-0 text-start whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-[15px] leading-7 text-white/90">
  <ReactMarkdown
  remarkPlugins={[remarkGfm, 
        remarkMath, 
        remarkToc]}
        
        rehypePlugins={[
        rehypeRaw,
        rehypeSanitize, 
        rehypeHighlight,
        rehypePrismPlus,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex
      ]}>
    
   {content}
  
  </ReactMarkdown>

  </div>

        <div className="mt-3 flex items-center justify-between gap-8">

          {!isUser ? (
            <div>

            </div>
          ) : (
            <div>
                
            </div>
          )}

         

        </div>
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7b5be6] text-[11px] font-semibold text-white">
          BM
        </div>
      )}

    </div>
  );
};

export default Message;
