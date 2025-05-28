// uploadthing.config.js
import { createUploadthing } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete for file:", file);
  }),
};
