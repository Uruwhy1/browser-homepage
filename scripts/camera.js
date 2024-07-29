document.addEventListener("DOMContentLoaded", () => {
  const cameraContainer = document.querySelector(".camera-container");

  const cameraButton = document.querySelector(".camera-icon");
  const video = document.getElementById("video");

  cameraButton.addEventListener("click", () => {
    getUserMedia();
  });
  let mediaStream;

  function getUserMedia() {
    // Request video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        mediaStream = stream;

        // Display the video stream in the video element.
        video.srcObject = stream;
        video.style.animation = "appear 1s 1 linear";

        setTimeout(() => {
          cameraContainer.style.display = "grid";
        }, 500);
      })
      .catch((error) => {
        console.error("Error accessing the camera: ", error);
      });
  }

  document.addEventListener("click", () => {
    if (cameraContainer.style.display == "grid") {
      cameraContainer.style.display = "none";
      stopVideoStream();
    }
  });

  function stopVideoStream() {
    if (mediaStream) {
      let tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      mediaStream = null;
    }
  }
});
