import React from "react";

const Message = ({ role = "ai", content, time }) => {
  const isUser = role === "user";
  const isLongMessage = content.length > 80 || content.includes("\n");

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      {!isUser && (
        <div className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900">
          <i className="ri-perplexity-fill text-xl text-white"></i>
        </div>
      )}

      <div
  className={` ${
    isUser
      ? "mr-3 bg-[#30283d]/30 max-w-[30vw]"
      : "ml-3"
  } min-w-0 overflow-hidden flex items-center justify-center ${
    isLongMessage ? "rounded-xl px-5 py-4" : "rounded-full px-4 py-2"
  }`}
>
  <p className="min-w-0 text-start whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-[15px] leading-7 text-white/90">
    {content}
  </p>

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
