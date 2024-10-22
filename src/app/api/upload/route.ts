// upload the image to s3 bucket ...

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { files } = await request.json(); // Expecting an array of files [{filename, contentType}]

  if (!Array.isArray(files) || files.length === 0) {
    return Response.json({ error: "No files provided" }, { status: 400 });
  }

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const urls = await Promise.all(
      files.map(async (file) => {
        const { filename, contentType } = file;
        console.log(filename);
        const { url, fields } = await createPresignedPost(client, {
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: uuidv4(), // Unique key for each image
          Conditions: [
            ["content-length-range", 0, 10485760], // up to 10 MB
            ["starts-with", "$Content-Type", contentType],
          ],
          Fields: {
            acl: "public-read",
            "Content-Type": contentType,
          },
          Expires: 600, // Seconds before the presigned post expires. 3600 by default.
        });
        return { url, fields };
      })
    );

    return Response.json({ urls });
  } catch (error) {
    return Response.json({ error: error });
  }
}
