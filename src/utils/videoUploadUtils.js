import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// Set the parameters
export const uploadParams = {
  Bucket: "tpatvideos",
  // Add the required 'Key' parameter using the 'path' module.
  Key: "videoKey",
  // Add the required 'Body' parameter
  Body: { fileStream: "jlkhlkjhlkh" },
};

async function uploadTos3(videoBlob) {
  const s3Client = gets3Client();
  try {
    uploadParams.Body = videoBlob;
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
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
