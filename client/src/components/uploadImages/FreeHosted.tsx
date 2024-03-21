import { useState } from "react";
import axios from "axios";

const FreeHosted = ({ uploading, setUploading, onSubmitClick }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...files]);
  };

  const handleUpload = async () => {
    setUploading(true);
    onSubmitClick({ images: selectedImages });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || selectedImages.length === 0}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FreeHosted;
