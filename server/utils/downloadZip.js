import archiver from "archiver";
import { drive } from "../googleAuth.js";

// Function to download an image and add it to zip
async function downloadAndZip(fileId, zip) {
  if (fileId.length > 24) {
    try {
      const fileMetadata = await drive.files.get({ fileId });
      const fileName = fileMetadata.data.name;
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        { responseType: "stream" }
      );
      console.log(fileName);
      // Add image file to the archive
      zip.append(response.data, { name: fileName + ".jpg" });
    } catch (error) {
      console.error("Error downloading and zipping image:", error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  } else {
  }
}

// Main function to create zip file
export async function createZip(idArray) {
  const zip = archiver("zip");
  for (const id of idArray) {
    await downloadAndZip(id, zip);
    console.log("Zippied");
  }
  await zip.finalize();
  console.log("Zip file created successfully");
  return zip;
}

// Route to download the zip file
