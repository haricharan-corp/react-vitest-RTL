import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const validateAndProcess = (selectedFile) => {
    if (!selectedFile) return;

    // 1. Validate file type
    if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
      setError("Only PNG and JPEG images are allowed");
      setFile(null);
      return;
    }

    // 2. Validate file size (2MB limit)
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be under 2MB");
      setFile(null);
      return;
    }

    setError(null);
    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const handleInputChange = (e) => {
    validateAndProcess(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0];
    validateAndProcess(droppedFile);
  };

  return (
    <div>
      <label htmlFor="avatar-input">Upload Avatar</label>
      <input
        id="avatar-input"
        type="file"
        // accept="image/png, image/jpeg"
        onChange={handleInputChange}
      />

      <div
        data-testid="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{ border: "2px dashed #ccc", padding: "20px" }}
      >
        Drag and drop your image here
      </div>

      {error && <p role="alert">{error}</p>}
      {file && <p>Uploaded: {file.name}</p>}
    </div>
  );
}
