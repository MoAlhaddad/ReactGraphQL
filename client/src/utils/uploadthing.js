import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers,
  } from "@uploadthing/react";
  
  // No TypeScript generics here
  
  // Just generate components without type params
  export const UploadButton = generateUploadButton();
  export const UploadDropzone = generateUploadDropzone();
  export const { useUploadThing, uploadFiles } = generateReactHelpers();
  