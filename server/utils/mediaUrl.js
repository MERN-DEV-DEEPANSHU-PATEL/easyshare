import { drive } from "../googleAuth.js";

async function getUrlsFromGoogleDrive(folderId, pageToken = null) {
  let files = [];
  let nextPageToken = pageToken;
  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "nextPageToken, files(id, mimeType,thumbnailLink)",
      pageToken: nextPageToken,
    });

    files = files.concat(response.data.files);
    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return files;
}

export const getImageLinks = async (folderLink) => {
  const folderId = folderLink.match(/[-\w]{25,}/);
  if (!folderId) {
    throw new Error("Invalid folder link");
  }
  const files = await getUrlsFromGoogleDrive(folderId);
  const promises = files
    .filter((file) => file.mimeType.startsWith("image/"))
    .map(async (file) => {
      const downloadLink = await drive.files.get({
        fileId: file.id,
        alt: "media",
      });
      console.log("first");
      return {
        id: file.id,
        srcUrl: file.thumbnailLink,
        config: downloadLink.config,
      };
    });
  const imageLinks = await Promise.all(promises);
  // console.log("work IS Done", imageLinks);
  return imageLinks;
};

export const downloadImage = (req, res) => {
  drive.files.get(
    {
      fileId: req.params.id,
      alt: "media",
    },
    { responseType: "stream" },
    async (err, response) => {
      if (err) {
        console.log(err);
      } else {
        await response.data
          .on("end", () => console.log("Done"))
          .on("error", () => console.log("error"))
          .pipe(res);
      }
    }
  );
};
