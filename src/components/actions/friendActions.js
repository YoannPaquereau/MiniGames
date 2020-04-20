import axios from "axios";

export const addFriend = (userId, friendId) => {
    axios
      .post("/api/friends/add", userId, friendId)
      .then(res => {
        console.log(res);
      })
      .catch(err =>
        console.log(err)
      );
    }
;

export const listUser = username => dispatch => {
    return axios
      .post("/api/friends/listUser", {username: username})
      .then(res => { return res.data; })
      .catch(err => { return err; });
    }
;