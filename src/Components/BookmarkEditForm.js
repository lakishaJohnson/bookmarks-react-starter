import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function BookmarkEditForm() {
  const URL = process.env.REACT_APP_API_URL;
  let { index } = useParams();
  // useParams GRABS REACT ROUTER PARAMS
  // GRABS NAVIGATE FUNCTION FROM REACT ROUTER
  const navigate = useNavigate();

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });
  // CALL setBookmark W/BOOKMARK AT CURRENT INDEX POSITION
  // setBookmark({name: "MDN", url: "www.mdn.com", category: "educational", description: "", isFavorite: false})

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };
  // GET/MAKE API CALL USING INDEX FROM ROUTER
  useEffect(() => {
    axios.get(`${URL}/bookmarks/${index}`).then((response) => {
      setBookmark(response.data);
    });
  }, [URL, index]);

  // ON SUBMIT, MAKE A PUT REQ. ONLY BOOKMARK AT THAT INDEX POSITION SHOULD BE UPDATED IN API THEN NAVIGATE TO BOOKMARK THAT REFLECT CHANGES
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${URL}/bookmarks/${index}`, bookmark).then(() => {
      navigate(`/bookmarks/${index}`);
    });
  };
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
