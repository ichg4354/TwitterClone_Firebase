import react from "react";

const TweetForm = () => {
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
