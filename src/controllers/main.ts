import { Request, Response } from "express";
import { createKey } from "../helpers/encryption";

module.exports = {
  home: (req: Request, res: Response) => {
    res.status(200).end("Use /api/messages/(receiver:sender)/:address to query the API.");
  },
};
