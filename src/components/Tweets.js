import { useRef } from "react";
import { useState } from "react/cjs/react.development";

const Tweets = ({ tweets }) => {
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [oldTweet, setOldTweet] = useState("");
  const [newTweet, setNewTweet] = useState(oldTweet);
  const onClick = (event, tweetObj) => {
    const {
      target: { name },
    } = event;
    if (name === "delete") {
    } else if (name === "update") {
      setUpdateBtnClicked(true);
      setOldTweet(tweetObj.text);
      console.log(tweetObj.text);
    } else {
      setUpdateBtnClicked(false);
    }
  };
  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  return updateBtnClicked ? (
    <div>
      <input type="text" value={newTweet} onChange={onChange}></input>
      <input type="submit" value="Edit"></input>
      <button name="cancel" onClick={onClick}>
        Cancel
      </button>
    </div>
  ) : (
    tweets.map((each) => (
      <div key={each.id}>
        <h3>{each.text}</h3>
        <div>
          <button name="delete" onClick={onClick}>
            Delete
          </button>
          <button name="update" onClick={(e) => onClick(e, each)}>
            Update
          </button>
        </div>
      </div>
    ))
  );
};
export default Tweets;
