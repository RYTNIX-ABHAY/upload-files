import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setfile] = useState(null);
  const [imgurl, setimgurl] = useState("");

  const handlefilechange = (e) => {
    setfile(e.target.files[0]); // ✅ correct way for file inputs
  };

  const handleupload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setimgurl(res.data.url); // ✅ correct state update
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload to Cloudinary</h2>
      <input type="file" onChange={handlefilechange} />
      <button onClick={handleupload}>Upload</button>

      {imgurl && (
        <div style={{ marginTop: 20 }}>
          <h3>CONGRATS FILE UPLOADED</h3>
        </div>
      )}
    </div>
  );
};

export default App;
