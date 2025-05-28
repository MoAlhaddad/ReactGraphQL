// server.js (or backend/index.js)
import express from "express";
import cors from "cors";
import { uploadthingRouter } from "@uploadthing/express"; // hypothetical, check UploadThing docs

const app = express();
app.use(cors());

app.use("/api/uploadthing", uploadthingRouter);

app.listen(4000, () => {
  console.log("UploadThing backend running on port 4000");
});
