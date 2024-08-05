import {MdSend} from "react-icons/md";
import {useState} from "react";
import Markdown from 'react-markdown';
import { SiOpenai } from "react-icons/si";
import remarkGfm from "remark-gfm";

export const ChatBox = ({disabled, onMessageSend}: any) => {
  const [message, setMessage] = useState("");
  return (
    <form
      className="border-2 border-slate-400 rounded-lg p-2 flex flex-row m-2 text-slate-50"
      onSubmit={(e) => {
          e.preventDefault();
          onMessageSend(message);
          setMessage("");
      }}
      autoComplete="off"
      >
      <input
          name="message"
          className={
              "w-full " +
              "bg-slate-700 " +
              "focus:outline-none "
          }
          placeholder="Kerro sairauksistasi."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
      />
      <button
          disabled={disabled}
          className={
              "bg-slate-500 " +
              "text-white " +
              "font-bold " +
              "py-2 px-4 " +
              "rounded " +
              "hover:bg-pink-400 " +
              "disabled:bg-slate-600 " +
              "disabled:text-slate-400"
          }
      >
          <MdSend/>
      </button>
    </form>

  )
}

export const Message = ({message, role}: any) => {
  const roleIcon = role === "user"
        ? <div className="rounded-full h-8 w-8 bg-slate-600 flex items-center justify-center font-semibold text-slate-300 shrink-0">S</div>
        : <div className="rounded-full h-8 w-8 bg-pink-600 flex items-center justify-center font-semibold text-slate-50 shrink-0"><SiOpenai /></div>

    const roleName = role === "user"
        ? "Sinä"
        : "ChatGPT";

    return (
        <div className="flex flex-row mx-2 my-4">
            {roleIcon}
            <div className="p-1 ml-2">
                <div className="flex-col">
                    <p className="font-semibold text-slate-400">{roleName}</p>
                    <Markdown
                        className="text-slate-50 markdown"
                        remarkPlugins={[remarkGfm]}
                    >
                        {message}
                    </Markdown>
                </div>
            </div>
        </div>
    )
}
