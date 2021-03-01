import { storageService, dataService } from "fBase";
import react from "react";
import { useState } from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";

const TweetFormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TweetTextinput = styled.input`
  border: none;
  padding: 10px 20px;
  border-radius: 15px 0 0 15px;
  width: 100%;
  overflow: hidden;
`;

const TweetTextContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Tweetform = styled.form``;

const TweetSubmitBtn = styled.button`
  border-radius: 0 15px 15px 0;
  background-color: white;
  padding: 0;
  border: none;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

const TweetImage = styled.img`
  border-radius: 15px;
  position: absolute;
  left: 42px;
  top: 30px;
`;
const TweetFileLabel = styled.label`
  cursor: pointer;
  justify-content: center;
  text-align: center;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const TweetFileinput = styled.input`
  display: none;
`;

const ClearBtnContainer = styled.div`
  float: right;
`;

const ClearBtn = styled.button`
  background: none;
  border: 1px solid #1da1f2;
  border-radius: 5px;
  color: #1da1f2;
`;

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
    <TweetFormContainer>
      <Tweetform onSubmit={onSubmit}>
        <TweetTextContainer>
          {imageFile ? (
            <TweetImage
              src={URL.createObjectURL(imageFile)}
              style={{ width: 50, height: 50 }}
            ></TweetImage>
          ) : null}
          <TweetTextinput
            onChange={onChange}
            value={tweet}
            type="text"
            placeholder="Whats on your mind"
            id="tweetInput"
          ></TweetTextinput>
          <TweetSubmitBtn type="submit" value="submit">
            <AiOutlineArrowLeft style={{ width: "25px", height: "25px" }} />
          </TweetSubmitBtn>
        </TweetTextContainer>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <TweetFileLabel htmlFor="imageInput" style={{ color: "white" }}>
            <span style={{ color: "#1da1f2", textAlign: "center" }}>
              Add Photos
            </span>
            <RiAddFill
              style={{
                width: "20px",
                height: "19px",
                color: "#1DA1F2",
              }}
            />
          </TweetFileLabel>
          <TweetFileinput
            type="file"
            accept="image/*"
            onChange={onFileSubmit}
            id="imageInput"
          />
        </div>
        <ClearBtnContainer style={{ float: "right" }}>
          <ClearBtn onClick={onClearBtnClick}>Clear</ClearBtn>
        </ClearBtnContainer>
      </Tweetform>
    </TweetFormContainer>
  );
};

export default TweetForm;
