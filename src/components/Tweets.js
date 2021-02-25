import { dataService, storageService } from "fBase";
import { useEffect, useState } from "react/cjs/react.development";

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
      console.log(imagePath);
      setImageLink(link);
    } else {
      setImageLink(null);
    }
  };

  const onDeleteBtnClick = async () => {
    console.log(tweetObj.id);
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
    <div>
      {imagePath ? (
        <img
          src={imageLink}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      ) : (
        <></>
      )}
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
    </div>
  ) : (
    <div key={tweetObj.id}>
      {imagePath ? (
        <img
          src={imageLink}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      ) : (
        <></>
      )}
      <h3>{tweetObj.text}</h3>
      <div>
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
      </div>
    </div>
  );
};
export default Tweets;
