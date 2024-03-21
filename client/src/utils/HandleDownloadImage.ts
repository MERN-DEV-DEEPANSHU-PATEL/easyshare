import { makeRequest } from "../hooks/usePrivateAxios";

export const handleDownload = async (image) => {
  if (image.id) {
    try {
      console.log(image);
      const res = await fetch(image.config.url, image.config);
      console.log(res);
      const blob = await res.blob();

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.style.display = "none";

      // Create a URL for the blob and assign it to the anchor's href attribute
      const url = window.URL.createObjectURL(blob);
      a.href = url;

      // Set the filename for the download
      a.download = "image.jpg";

      // Append the anchor to the body and click it to trigger the download
      document.body.appendChild(a);
      a.click();

      // Remove the anchor from the body
      document.body.removeChild(a);

      // Revoke the URL to release resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  } else {
    try {
      console.log(image);
      const res = await fetch(image.url);
      console.log(res);
      const blob = await res.blob();

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.style.display = "none";

      // Create a URL for the blob and assign it to the anchor's href attribute
      const url = window.URL.createObjectURL(blob);
      a.href = url;

      // Set the filename for the download
      a.download = "image.jpg";

      // Append the anchor to the body and click it to trigger the download
      document.body.appendChild(a);
      a.click();

      // Remove the anchor from the body
      document.body.removeChild(a);

      // Revoke the URL to release resources
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
};

export const handleDownloadZip = async () => {
  try {
    console.log("downloadZipIs Started");
    const response = await makeRequest.post(
      "/event/media/downloadzip",
      { idArray: selectedImages },
      {
        responseType: "blob",
      }
    );
    console.log("Response geted");

    // Create a URL for the blob object
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create an anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downloaded_images.zip"); // Set the file name

    // Simulate a click on the anchor element to trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading zip file:", error);
  }
};
