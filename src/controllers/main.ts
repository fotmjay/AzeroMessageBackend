import { Request, Response } from "express";

module.exports = {
  home: (req: Request, res: Response) => {
    res.status(200).end("Use /api/messages/(receiver:sender)/:address to query the API.");
  },
};
