import express, { Request, Response, NextFunction } from "express";

var router = express.Router();

//get home

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World");
});

export default router;
