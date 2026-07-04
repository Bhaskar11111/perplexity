import React from "react";

const Sidebar = () => {
  const chats = [
    "What is Artificial Intelligence?",
    "Best practices for React",
    "Explain Quantum Computing",
    "Tips for productivity",
    "How to learn JavaScript?",
    "Theory of Relativity",
  ];

  return (
    <aside className="w-[292px] h-screen bg-neutral-900 border-r border-white/8 flex flex-col">

      <div className="px-5 py-5">
        <div className="flex items-center gap-1 text-white">
          <div className="grid h-8 w-8 place-items-center rounded-md text-2xl">
            <i className="ri-perplexity-fill "></i>
          </div>
          <span className="text-xl font-thin tracking-[0]">Perplexity</span>
          
        </div>
      </div>
   
      <div className="px-4">
        <button className="flex h-10 w-full items-center justify-center gap-1 text-center rounded-md bg-neutral-800 text-sm font-medium text-white transition hover:bg-[#8b6cf1]/80 cursor-pointer">
          <i className="ri-add-line text-base mt-[3px]"></i>
          New chat
        </button>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-3">

        <h3 className="mb-2 px-2 text-xs font-medium uppercase tracking-[0.08em] text-white/42">
          Recent
        </h3>

        <div className="space-y-1">
          {chats.map((chat, index) => (
            <button
              key={index}
              className={`group w-full rounded-md px-3 py-2.5 text-left transition ${
                index === 0
                  ? "bg-[#30283d] text-white"
                  : "text-white/68 hover:bg-[#2B2438] hover:text-white"
              }`}
            >
              <h4 className="truncate text-[13px] font-medium leading-5">
                {chat}
              </h4>

              <p className="mt-0.5 text-[11px] text-white/34">
                {index + 1}h ago
              </p>
            </button>
          ))}
        </div>
      </div>

     
      <div className="border-t border-white/8 p-4">
        <button className="flex w-full items-center gap-3 rounded-md p-2 text-left transition hover:bg-[#2B2438]">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7b5be6] text-xs font-semibold text-white">
            BM
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-white">
              Bhaskar Mishra
            </h3>

            <p className="truncate text-xs text-white/40">
              bhaskar@gmail.com
            </p>
          </div>

          <i className="ri-more-2-fill text-lg text-white/42"></i>

        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
