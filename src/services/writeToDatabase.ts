import Message from "../models/Message";

type MessageEvent = {
  from: string;
  to: string;
  text: string;
};

export const writeToDatabase = async (event: MessageEvent, timestamp: number, link: string) => {
  const communication = new Message({
    from: event.from.toLowerCase(),
    to: event.to.toLowerCase(),
    text: event.text,
    timestamp: timestamp,
    explorerLink: link,
  });
  try {
    const saveToDb = await communication.save();
  } catch (err) {
    console.error(err);
  }
};
