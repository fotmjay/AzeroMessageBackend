import { Request, Response } from "express";

module.exports = {
  getHome: (req: Request, res: Response) => {
    const query = req.params.anything;
    res.status(404).end(`404: not found.  Use /docs to see the API documentation.`);
  },
  getDocumentation: (req: Request, res: Response) => {
    res.status(200).end("Placeholder for documentation.");
  },
};
