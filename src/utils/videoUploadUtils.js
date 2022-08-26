import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const TPAT_VIDEOS_BUCKET = "tpatvideos";

/**
 * @param videoBlob 
 * @param metadata  example metadata =   {
        username: "Teacher 1",
        email: "teacher@gmail.com",
        taskId: "1",
      },
 * @returns 
 */
async function uploadTos3(videoBlob, metadata) {
  const s3Client = gets3Client();
  try {
    const uploadParams = {
      Bucket: TPAT_VIDEOS_BUCKET,
      Body: videoBlob,
      //key format : Timestamp + username + taskId. aids sorting in aws
      Key:
        Date.now() +
        metadata.username.replace(/\s/g, "") + //remove whitespace from name
        "task" +
        metadata.taskId +
        ".webm",
      Metadata: metadata,
    };
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error sfsd", err);
  }
}

function gets3Client() {
  const client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: "AKIAR4AR4PW6KXERGY7I",
      secretAccessKey: "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",
    },
  });

  return client;
}

export { gets3Client, uploadTos3 };
