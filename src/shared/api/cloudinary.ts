import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/services/cloudinary.config";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

export async function uploadToCloudinary(file: File, folder?: string): Promise<{ url: string; public_id: string; resource_type: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder || "uploads",
        resource_type: "auto", // <--- THIS IS THE KEY FIX
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));

        // It's helpful to return resource_type so you know if it was stored as 'video' or 'image'
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
        });
      }
    );

    stream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<{ result: string }> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { result: result.result };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
}
