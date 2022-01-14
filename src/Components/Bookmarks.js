import { useState, useEffect } from "react";
import axios from "axios";
// FILES
import Bookmark from "./Bookmark";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // GET/MAKE API CALL TO /bookmarks
    axios.get(`${URL}/bookmarks/`).then((response) => {
      setBookmarks(response.data);
      console.log(response);
      console.log(response.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // EMPTY ARRAY IS NEEDED TO KEEP FROM MULTIPLE RENDERINGS

  // useEffect(() => {
  //   const result = async () => {
  //     // console.log("we hit useEffect!");
  //     const response = await axios.get(`${URL}/bookmarks`);
  //     setBookmarks(response.data);
  //     console.log(response);
  //     console.log(response.data);
  //   };
  //   result();
  // }, []);

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>

          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
