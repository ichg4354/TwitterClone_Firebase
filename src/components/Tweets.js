import { dataService, storageService } from "fBase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TweetsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TweetContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  margin-bottom: 35px;
  border-radius: 15px;
  max-width: 400px;
  padding: 10px 15px;
  flex-direction: column;
  position: relative;
  min-height: 40px;
`;

// const Tweet

const TweetText = styled.h3`
  font-size: 20px;
  font-weight: 400;
  margin-top: 0;
  width: 50%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const FunctionBtnContainer = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: flex-end;
`;

const TweetImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  justify-self: flex-end;
  position: absolute;
  right: -5px;
  top: 50px;
`;

const LOADINGIMAGE =
  "https://media1.tenor.com/images/2d135229987db0745acfc8a277263784/tenor.gif?itemid=12556485";

const Tweets = ({ tweetObj, isTweeter, imagePath }) => {
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const [imageLink, setImageLink] = useState(LOADINGIMAGE);

  let IMAGE_REF = storageService.ref().child(imagePath);

  const getImage = async () => {
    if (imagePath) {
      let link = await IMAGE_REF?.getDownloadURL();
      setImageLink(link);
    } else {
      setImageLink(null);
    }
  };

  const onDeleteBtnClick = async () => {
    if (window.confirm("would you like to really delete?")) {
      await dataService.collection("tweets").doc(tweetObj.id).delete();
      if (imagePath) {
        await IMAGE_REF.delete();
      }
    }
  };
  const onUpdateBtnClick = () => {
    setUpdateBtnClicked(true);
  };
  const onEditInitBtnClick = async () => {
    await dataService
      .collection("tweets")
      .doc(tweetObj.id)
      .set({ text: newTweet }, { merge: true });

    setUpdateBtnClicked(false);
  };

  const onCancelBtnClick = () => {
    setUpdateBtnClicked(false);
  };

  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  useEffect(() => {
    getImage();
  }, []);

  return updateBtnClicked ? (
    <TweetContainer>
      <input type="text" value={newTweet} onChange={onChange}></input>
      <input
        type="submit"
        value="Edit"
        name="editInit"
        onClick={onEditInitBtnClick}
      ></input>
      <button name="cancelBtn" onClick={onCancelBtnClick}>
        Cancel
      </button>
    </TweetContainer>
  ) : (
    <TweetsContainer key={tweetObj.id}>
      <TweetContainer>
        <FunctionBtnContainer>
          {isTweeter ? (
            <>
              <button name="deleteInit" onClick={onDeleteBtnClick}>
                Delete
              </button>
              <button name="updateBtn" onClick={onUpdateBtnClick}>
                Update
              </button>
            </>
          ) : null}
        </FunctionBtnContainer>
        <TweetText>{tweetObj.text}</TweetText>
        {imagePath ? <TweetImage src={imageLink} /> : <></>}
      </TweetContainer>
    </TweetsContainer>
  );
};
export default Tweets;
