import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { Blob } from "buffer";

const TPAT_VIDEOS_BUCKET = "tpat"; //tpat

function getFileName(metadata: {
  name: string;
  email: string;
  taskId: string;
  university: string;
}) {
  //name format :
  //Timestamp_Unviersity_Email_FirstLast_Task 1-1 ---> 1662564392732_UVA_lhmclean_LindseyMcLean_Task 1-1
  return (
    metadata.university + // university folder
    "/" +
    Date.now() +
    "_" +
    metadata.university +
    "_" +
    metadata.email.split("@")[0] +
    "_" + //get first part of email
    metadata.name.replace(/\s/g, "") +
    "_" + //remove whitespace from name
    "Task" +
    metadata.taskId +
    ".webm"
  );
}
/**
 * @param videoBlob 
 * @param metadata  example metadata =   {
        username: "Teacher 1",
        email: "teacher@gmail.com",
        taskId: "1",
        university: "UVA";
      },
 * @returns 
 */
async function uploadTos3(
  videoBlob: Blob,
  metadata: {
    name: string;
    email: string;
    taskId: string;
    university: string;
  }
) {
  const s3Client = gets3Client();
  try {
    const uploadParams = {
      Bucket: TPAT_VIDEOS_BUCKET,
      Body: videoBlob,

      Key: getFileName(metadata),
      Metadata: metadata,
    };
    const data = await s3Client.send(
      new PutObjectCommand(uploadParams as PutObjectCommandInput)
    );
    console.log("Upload succeeded", data);
    return data;
  } catch (err) {
    console.log("An error occured during upload. Error", err);
  }
}

function gets3Client() {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: "AKIAR7IMRMF7S3LSEI4F",
      secretAccessKey: "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",
    },
  });

  return client;
}

export { uploadTos3, getFileName };