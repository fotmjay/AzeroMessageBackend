import Message from "../models/Message";

type MessageEvent = {
  from: string;
  to: string;
  text: string;
};

export const writeToDatabase = async (event: MessageEvent, timestamp: number, link: string) => {
  const communication = new Message({
    from: event.from,
    to: event.to,
    text: event.text,
    timestamp: timestamp,
    explorerLink: link,
    encrypted: false,
  });
  try {
    const exists = await Message.find({ from: event.from, to: event.to, timestamp: timestamp, text: event.text });
    if (!exists) {
      const saveToDb = await communication.save();
    }
  } catch (err) {
    console.error(err);
  }
};
