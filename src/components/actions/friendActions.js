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

export const listUser = data => dispatch => {
    return axios
      .post("/api/friends/listUser", data)
      .then(res => { return res.data; })
      .catch(err => { return err; });
    }
;