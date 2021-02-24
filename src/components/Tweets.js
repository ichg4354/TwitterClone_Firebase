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

  const onClick = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === "deleteInit") {
      if (window.confirm("would you like to really delete?")) {
        await dataService.collection("tweets").doc(tweetObj.id).delete();
        if (imagePath) {
          await IMAGE_REF.delete();
        }
      }
    } else if (name === "updateBtn") {
      setUpdateBtnClicked(true);
    } else if (name === "editInit") {
      await dataService
        .collection("tweets")
        .doc(tweetObj.id)
        .set({ text: newTweet }, { merge: true });
      setUpdateBtnClicked(false);
    } else if (name === "cancelBtn") {
      setUpdateBtnClicked(false);
    }
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
        onClick={onClick}
      ></input>
      <button name="cancelBtn" onClick={onClick}>
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
            <button name="deleteInit" onClick={onClick}>
              Delete
            </button>
            <button name="updateBtn" onClick={onClick}>
              Update
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Tweets;
