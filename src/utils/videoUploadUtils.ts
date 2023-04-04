import {
  S3Client,
} from "@aws-sdk/client-s3";
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
 * uploads video to s3 in part
 * @param videoBlob
 * @param metadata
 * @param onProgress  function to call on each progress update
 * @param onUploadComplete function to call when upload is completed successfully
 */
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
  onProgress: (progressPercentage: number) => void,
  onUploadFail: () => void,
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
    onUploadFail();
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

export { getFileName, uploadInParts };
