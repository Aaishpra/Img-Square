import React, { useEffect } from "react";
import styles from '../components/authenticate/styles/Videofeed.module.css'

const videofeed = () => {

  useEffect(() => {

    function onSubmit(e) {
      e.preventDefault();
      var customMessage = document.getElementById('message');
      if(validateForm(customMessage)) {
        uploadVideo(customMessage);
      }
    }

    function validateForm(customMessage) {
      const uploadedFile = document.getElementById('video-upload').elements[0].files[0];
      if(!uploadedFile) {
        customMessage.innerHTML = "Please select a video to upload";
        return false;
      }
      const fileLimit = 104857600;
      if(uploadedFile.size > fileLimit) {
        customMessage.innerHTML = "Maximum video size allowed: 100MB";
        return false;
      }
      return true;
    }

    function uploadVideo(customMessage) {
      document.getElementById("submit").disabled = true;
      customMessage.innerHTML = 'uploading video..'
      var formElement = document.getElementById("video-upload");
      var request = new XMLHttpRequest();
      request.open("POST", "/", true);
      request.onload = onComplete;
      request.upload.onprogress = fileUploadPercentage;
      const data = new FormData(formElement);
      request.send(data);
    }

    function onComplete(event) {
      var customMessage = document.getElementById('message');
      const response = JSON.parse(event.currentTarget.response);
      if(response.success) {
        document.getElementById('main-div').style.display = 'none';
        customMessage.style.color = '#9C27B0';
        customMessage.innerHTML = 'Video Uploaded successfully!!. Please <a href='+ response.link +'>click here</a> to view the video.';
      } else {
        customMessage.innerHTML = response.error;
        customMessage.style.color = 'red';
      }
      document.getElementById("submit").disabled = false;
    }

    function fileUploadPercentage(e) {
      if (e.lengthComputable) {
        var customMessage = document.getElementById('message');
        var percentage = (e.loaded / e.total) * 100;
        customMessage.innerHTML = 'Uploading Video: ' + percentage + ' %';
      }
    };


  }, [])

  return (
    <body class={styles.mainmargin}>
    <div id='main-div'>
    <form enctype="multipart/form-data" name='videoUpload' id='video-upload' >
      <div class='form-group'>
        <label class={styles.custom_label}> Select file to upload: </label>
        <input accept="video/mp4" type="file" name="user-file" />
      </div>

      <div class={styles.formgroup}>
        <label class={styles.custom_label}> Video Details:</label>
        <textarea rows="10" cols="50" name='details'></textarea>
      </div>

      <div id={styles.submitid}>
        <input type="submit" id='submit' value="Upload File" onclick='onSubmit(event)' name="submit" />
      </div>
    </form>
  </div>
  <div id={styles.message}>
  </div>
</body>
  );
};

export default videofeed;