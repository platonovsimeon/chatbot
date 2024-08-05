export const createThread = () => {
  try {
    return fetch("https://api.openai.com/v1/threads", {
      method: "post",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2",
    }}).then(response => response.json());
  } catch (error: any) {
    console.log(error);
  }
}

export const fetchThread = (threadId: string) => {
  try {
    return fetch(`https://api.openai.com/v1/threads/${threadId}`, {
      method: "get",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2",
    }}).then(response => response.json());
  } catch (error: any) {
    console.log(error);
  }
}

export const fetchMessages = (threadId: string) => {
  try {
    return fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "get",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2",
    }}).then(response => response.json());
  } catch (error: any) {
    console.log(error);
  }
}

export const fetchRun = (threadId: string, runId: string) => {
  try {
    return fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
      method: "get",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2",
    }}).then(response => response.json());
  } catch (error: any) {
    console.log(error);
  }
}

export const postMessage = async (threadId: string, message: string) => {
  try {
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "post",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2", "Content-Type" : "application/json" },
      body: JSON.stringify({
        role: "user",
        content: message
      })
    });

    return fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "post",
      headers: {"Authorization" : `Bearer ${process.env.REACT_APP_API_KEY}`, "OpenAI-Beta" : "assistants=v2", "Content-Type" : "application/json" },
      body: JSON.stringify({
        assistant_id: process.env.REACT_APP_ASSISTANT_ID
      })
    }).then(response => response.json());

  } catch (error: any) {
    console.log(error);
  }
}
