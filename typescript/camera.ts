document.addEventListener("DOMContentLoaded", () => {
  const cameraContainer = document.querySelector(
    ".camera-container"
  ) as HTMLElement;

  const cameraButton = document.querySelector("#camera-icon");
  const video = document.getElementById("video") as HTMLVideoElement;

  if (cameraButton) {
    cameraButton.addEventListener("click", () => {
      getUserMedia();
    });
  }
  let mediaStream: MediaStream | null = null;

  function getUserMedia(): void {
    // Request video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        mediaStream = stream;

        if (video) {
          video.srcObject = stream;
          video.style.animation = "appear 1s 1 linear";
        }

        if (cameraContainer) {
          setTimeout(() => {
            cameraContainer.style.display = "grid";
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera: ", error);
      });
  }

  document.addEventListener("click", () => {
    if (cameraContainer) {
      if (cameraContainer.style.display == "grid") {
        cameraContainer.style.display = "none";
        stopVideoStream();
      }
    }
  });

  function stopVideoStream(): void {
    if (mediaStream) {
      let tracks = mediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      mediaStream = null;
    }
  }
});
