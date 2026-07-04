import React from "react";
import Message from "./Message";

const ChatWindow = () => {
  return (
    <main className="flex h-screen  flex-1 flex-col bg-[#111]">

     
      <header className="flex h-16 items-center justify-between border-b border-white/8 px-8">
        <div>
    
          <h2 className="mt-0.5 text-[17px] font-thin text-white">
            What is Artificial Intelligence?
          </h2>
        </div>

        
      </header>

      <section className="flex-1  overflow-y-auto px-20 py-7">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <Message
            role="user"
            content="What is Artificial Intelligence?"
            time="10:42 AM"
          />

          <Message
            role="ai"
            content="Artificial Intelligence (AI) refers to computer systems that can perform tasks usually associated with human reasoning, such as understanding language, recognizing patterns, making predictions, and solving problems."
            time="10:42 AM"
          />

          <Message
            role="user"
            content="Can you give me some examples?"
            time="10:43 AM"
          />

          <Message
            role="ai"
            content="Common examples include search ranking, fraud detection, voice assistants, recommendation systems, medical image analysis, and tools that summarize or draft text."
            time="10:43 AM"
          />
          <Message
            role="user"
            content="What is Artificial Intelligence?"
            time="10:42 AM"
          />

          <Message
            role="ai"
            content="Artificial Intelligence (AI) refers to computer systems that can perform tasks usually associated with human reasoning, such as understanding language, recognizing patterns, making predictions, and solving problems."
            time="10:42 AM"
          />

          <Message
            role="user"
            content="Can you give me some examples?"
            time="10:43 AM"
          />

          <Message
            role="ai"
            content="Common examples include search ranking, fraud detection, voice assistants, recommendation systems, medical image analysis, and tools that summarize or draft text."
            time="10:43 AM"
          />
          <Message
            role="user"
            content=">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, tempora natus sit rem qui in illum eligendi et delectus fugiat corrupti asperiores praesentium cupiditate sunt aliquid ipsum recusandae explicabo consequuntur iusto voluptas incidunt omnis. Corrupti dolorem, repellat, laboriosam ratione voluptatem quae incidunt non dicta distinctio laudantium quod quo odit cum neque pariatur eos impedit nisi! Maxime quis eius natus quos? Recusandae distinctio dignissimos blanditiis aut accusamus ipsa. Ad laborum natus fugit maxime velit iusto laudantium. Pariatur quos mollitia nisi iusto illum animi minus libero nam ab dolorem. Fugit exercitationem ea recusandae laudantium veritatis quis, sed voluptates officiis explicabo odio porro."
            time="10:42 AM"
          />

          <Message
            role="ai"
            content="Artificial Intelligence (AI) refers to computer systems that can perform tasks usually associated with human reasoning, such as understanding language, recognizing patterns, making predictions, and solving problems. >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, tempora natus sit rem qui in illum eligendi et delectus fugiat corrupti asperiores praesentium cupiditate sunt aliquid ipsum recusandae explicabo consequuntur iusto voluptas incidunt omnis. Corrupti dolorem, repellat, laboriosam ratione voluptatem quae incidunt non dicta distinctio laudantium quod quo odit cum neque pariatur eos impedit nisi! Maxime quis eius natus quos? Recusandae distinctio dignissimos blanditiis aut accusamus ipsa. Ad laborum natus fugit maxime velit iusto laudantium. Pariatur quos mollitia nisi iusto illum animi minus libero nam ab dolorem. Fugit exercitationem ea recusandae laudantium veritatis quis, sed voluptates officiis explicabo odio porro."
            time="10:42 AM"
          />

          <Message
            role="user"
            content="Can you give me some examples?"
            time="10:43 AM"
          />

          <Message
            role="ai"
            content="Common examples include search ranking, fraud detection, voice assistants, recommendation systems, medical image analysis, and tools that summarize or draft text."
            time="10:43 AM"
          />
        </div>
      </section>


      <div className="px-10 flex items-center justify-center">

        <div className="flex items-center w-[53vw] rounded-full border border-white/10 bg-neutral-800 h-fit p-1 backdrop-blur-xl px-5 focus-within:border-[#7b5be6]/60">
  <div className="flex items-center w-full justify-between">
    <textarea
    rows={1}
    placeholder="Ask Perplexity..."
    className="flex-1 resize-none bg-transparent text-[15px] leading-6 text-white outline-none placeholder:text-white/35"
  />          

            <button className="group relative flex h-11 w-11 items-center justify-center rounded-full text-xl text-white transition-all duration-200 hover:bg-[#8b6cf1] cursor-pointer">

  <i className="ri-send-ins-line absolute transition-all duration-200 group-hover:scale-0 group-hover:opacity-0"></i>

  <i className="ri-send-ins-fill absolute scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"></i>

</button>
  </div>
          </div>

        </div>

        <p className="mt-3 text-center mb-1 text-xs text-white/34">
          Perplexity by Bhaskar can make mistakes. Check important information.
        </p>

    </main>
  );
};

export default ChatWindow;
