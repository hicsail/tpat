import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  CreateMultipartUploadCommand,
} from "@aws-sdk/client-s3";
// import { Blob } from "buffer";
import { Upload } from "@aws-sdk/lib-storage";

const TPAT_VIDEOS_BUCKET = "tpat"; //tpat

function getFileName(metadata: {
  firstName: string;
  lastName: string;
  email: string;
  taskId: string;
  university: string;
}) {
  //name format :
  //Timestamp_Unviersity_Email_FirstLast_Task 1-1.mp4 ---> 1662564392732_UVA_lhmclean_LindseyMcLean_Task 1-1
  return (
    metadata.university + // university folder
    "/" +
    Date.now() +
    "_" +
    metadata.university +
    "_" +
    metadata.email.split("@")[0] +
    "_" + //get first part of email
    metadata.firstName.replace(/\s/g, "") +
    metadata.lastName.replace(/\s/g, "") +
    "_" + //remove whitespace from name
    "Task" +
    metadata.taskId +
    ".mp4"
  );
}
/**
 * @param videoBlob
 * @param metadata
 * @returns
 */
async function uploadTos3(
  videoBlob: Blob,
  metadata: {
    firstName: string;
    lastName: string;
    email: string;
    taskId: string;
    university: string;
    attempts: string;
    firstViewed: string;
    netPrepTimeInHours: string;
    userAgent: string;
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
    //if video is less than 10 bytes, assume upload failed
    if (videoBlob.size < 10) {
      return false;
    }
    return true;
  } catch (err) {
    console.log("An error occured during upload. Error", err);
    return false;
  }
}

async function uploadInParts(
  videoBlob: Blob,
  metadata: {
    firstName: string;
    lastName: string;
    email: string;
    taskId: string;
    university: string;
    attempts: string;
    firstViewed: string;
    netPrepTimeInHours: string;
    userAgent: string;
  },
  onProgress: (progressPercentage: number) => void, // function to call on each progress update
  onUploadComplete: () => void
) {
  try {
    const s3Client = gets3Client();
    const uploadParams = {
      Bucket: TPAT_VIDEOS_BUCKET,
      Body: videoBlob,
      Key: getFileName(metadata),
      Metadata: metadata,
    };
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
      queueSize: 4, // concurrency configuration, 4 parts at a time
      partSize: 1024 * 1024 * 5, // size of each part, 5MB
      leavePartsOnError: false,
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log("multi-upload progress", progress);
      if (progress) {
        if (progress.loaded && progress.total) {
          if (progress.loaded == progress.total) {
            console.log("Upload succeeded");
            onUploadComplete();
          } else {
            onProgress((progress.loaded / progress.total) * 100);
          }
        }
      }
    });

    await parallelUploads3.done();
  } catch (e) {
    console.log("An error occured during upload. Error", e);
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

export { uploadTos3, getFileName, uploadInParts };
