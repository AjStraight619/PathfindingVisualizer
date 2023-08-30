// api for uploading own algorithms to the server

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("myFile", file);

  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Failed to upload file.");
    }
  } catch (error) {
    alert("An error occurred: " + error);
  }
}
