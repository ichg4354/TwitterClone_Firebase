import { dataService } from "fBase";
import { useRef } from "react";
import { useState } from "react/cjs/react.development";

const Tweets = ({ tweets }) => {
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [newTweet, setNewTweet] = useState("");
  const [userObj, setUserObj] = useState({});
  const onClick = async (event, tweetObj) => {
    const {
      target: { name },
    } = event;

    if (name === "deleteBtn") {
      if (window.confirm("would you like to really delete?")) {
        await dataService.collection("tweets").doc(tweetObj.id).delete();
      }
    } else if (name === "updateBtn") {
      setUpdateBtnClicked(true);
      setUserObj(tweetObj);
      setNewTweet(tweetObj.text);
    } else if (name === "editInit") {
      await dataService
        .collection("tweets")
        .doc(userObj.id)
        .set({ text: newTweet }, { merge: true });
      setUpdateBtnClicked(false);
    } else if (name === "cancelBtn") {
      setUpdateBtnClicked(false);
    }
  };
  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  return updateBtnClicked ? (
    <div>
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
    tweets.map((each) => (
      <div key={each.id}>
        <h3>{each.text}</h3>
        <div>
          <button name="deleteBtn" onClick={(e) => onClick(e, each)}>
            Delete
          </button>
          <button name="updateBtn" onClick={(e) => onClick(e, each)}>
            Update
          </button>
        </div>
      </div>
    ))
  );
};
export default Tweets;
