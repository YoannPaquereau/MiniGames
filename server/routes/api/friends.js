const express = require("express");
const router = express.Router();

const User = require("../../models/User");

// @route POST api/friends/add
// @desc id and return success or error
// @access Public

router.post('/add', (req, res) => {
    const user = req.body.idUser;
    const friend = req.body.idFriend;

    User.updateOne(
        { _id: friend },
        { 
            $addToSet: {        // add friend request only if not already exist
               friendsRequest: user
            }
        }
    )
    .then(res.send('ok'))
    .catch(err => res.send(err))
    ;
});

// @route POST api/friends/list
// @desc Username and return Users list
// @access Public

router.post('/listUser', (req, res) => {
    const searchUser = req.body.username;
    const userId = req.body.userId;

    User.find(
        { username: { $regex: searchUser, $options: 'i' }, _id: { $ne: userId } },
        { friends: 0, email: 0, password: 0, date: 0, __v: 0, friendsRequest: 0 }
        )
        .then(user => {
            res.json(user);
        })
        .catch(err => console.log(err))
    ;
});

module.exports = router;