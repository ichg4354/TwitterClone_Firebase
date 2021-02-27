import { storageService, dataService } from "fBase";
import react from "react";
import { useState } from "react/cjs/react.development";

const TweetForm = ({ imageFile, userData, setImageFile }) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    const imageInput = document.getElementById("imageInput");

    event.preventDefault();
    if (imageFile) {
      await storageService
        .ref()
        .child(`images/${userData.uid}/${imageFile?.lastModified}`)
        .put(imageFile);
    }
    if (tweet !== "") {
      await dataService.collection("tweets").add({
        text: tweet,
        createdAt: Date.now(),
        userId: userData.uid,
        imagePath: imageFile
          ? `images/${userData.uid}/${imageFile?.lastModified}`
          : "",
      });
    }
    setTweet("");
    imageInput.value = "";
    setImageFile("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileSubmit = (event) => {
    let {
      target: { files },
    } = event;
    setImageFile(files[0]);
  };

  const onClearBtnClick = () => {
    setImageFile(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={tweet}
        type="text"
        placeholder="Whats on your mind"
        id="tweetInput"
      ></input>
      <input type="submit" value="Tweet!"></input>
      <input
        type="file"
        accept="image/*"
        onChange={onFileSubmit}
        id="imageInput"
      />
      <div>
        <button onClick={onClearBtnClick}>Clear</button>
      </div>
    </form>
  );
};

export default TweetForm;
