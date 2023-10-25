import Message from "../models/Message";

type MessageEvent = {
  from: string;
  to: string;
  text: string;
  encrypted: string;
};

export const writeToDatabase = async (event: MessageEvent, timestamp: number, link: string) => {
  const communication = new Message({
    from: event.from,
    to: event.to,
    text: event.text,
    timestamp: timestamp,
    explorerLink: link,
    encrypted: event.encrypted === "true" ? true : false,
  });
  try {
    const exists = await Message.findOne({ from: event.from, to: event.to, timestamp: timestamp, text: event.text });
    if (!exists) {
      const saveToDb = await communication.save();
    }
  } catch (err) {
    console.error(err);
  }
};
