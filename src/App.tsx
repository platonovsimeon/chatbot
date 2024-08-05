import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {createThread, fetchRun, fetchMessages, postMessage} from "./Api";
import {Message, ChatBox} from "./ChatElements";

function App() {
  const [threadId, setThreadId] = useState<string|undefined>(undefined);
  const [messages, setMessages] = useState<any[]>([]);
  const [processing, setProcessing] = useState(false);

  const updateMessages = async () => {
    if (!threadId) {
      return;
    }

    setMessages((await fetchMessages(threadId)).data);
  }

  const pollRun = async (runId: string) => {
    if (!threadId) {
      return;
    }
    const runData = await fetchRun(threadId, runId);
    if (runData.status === "completed") {
      await updateMessages();
      setProcessing(false);
    } else {
      setTimeout(() => pollRun(runId), 1000);
    }
  }

  const sendNewMessage = async (message: string) => {
    if (!threadId) {
      return;
    }
    setProcessing(true);
    setMessages([{content: [{ text : { value: message }}], role: "user", id: "newMessage"}, ...messages]);
    const runData = await postMessage(threadId, message);
    setTimeout(() => pollRun(runData.id), 1000);
  }

  const renderedMessages = messages
      .filter((message) => message.hidden !== true)
      .map((message) => (
        <Message
            message={message.content[0].text.value}
            role={message.role}
            key={message.id}
        />
  ));

  const initThread = async () => {
    const thread = await createThread();
    setThreadId(thread.id);
  }
  useEffect(() => {
    if (!threadId) {
      initThread();
    }
  }, []);

  return (
    <div className="md:container md:mx-auto lg:px-32 h-screen bg-slate-700 flex flex-col">
      <div className="flex flex-col-reverse grow overflow-scroll">
          {renderedMessages}
      </div>
      <div className="my-4">
          <ChatBox
              onMessageSend={sendNewMessage}
              disabled={processing}
          />
      </div>
  </div>
  );
}

export default App;
