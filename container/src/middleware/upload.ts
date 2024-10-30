import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import s3Client from "../config/s3Client";
require("dotenv").config();
export const uploadToS3 = async (
  fileBuffer: Buffer,
  originalName: string,
  folderName: string
) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  console.log("bucketName", process.env.AWS_S3_BUCKET_NAME);
  const fileKey = `${uuidv4()}${path.extname(originalName)}`;

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    console.log("response from S3 ", response);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
