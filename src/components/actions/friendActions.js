import axios from "axios";

export const addFriend = (userId, friendId) => dispatch => {
  const data = {
    idUser: userId,
    idFriend: friendId
  }

    return axios
      .post("/api/friends/add", data)
      .then(res => { return res.data; })
      .catch(err => { return err; });
    }
;

export const listUser = username => dispatch => {
    return axios
      .post("/api/friends/listUser", {username: username})
      .then(res => { return res.data; })
      .catch(err => { return err; });
    }
;