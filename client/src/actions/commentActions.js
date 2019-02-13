// add comment

import { POST_COMMENT } from "./types";
import axios from "axios";

export const postComment = itinerariesArray => dispatch => {
  console.log("axiosing");

  axios
    .post("http://localhost:5000/testComment/commentsAll", {
      itinerariesArray: itinerariesArray
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    });
};

let config = {
  withCredentials: true,
  headers: { Authorization: "Bearer " + localStorage.getItem("user") }
};

export const addComment = (
  itinerary_id,
  user,
  comment,
  itinerariesArray
) => dispatch => {
  console.log("adding comment" + user + comment);
  console.log(localStorage.getItem("user"));
  axios
    .post(
      `/testComment/comments`,
      {
        itinerary_id,
        user,
        comment,
        itinerariesArray
      },
      config
    )
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: POST_COMMENT,
        payload: res.data
      });
    });
};
