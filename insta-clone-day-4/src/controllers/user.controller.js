const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");

async function userFollowController(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  if (followeeUsername === followerUsername) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const isUserExist = await userModel.findOne({ username: followeeUsername });

  if (!isUserExist) {
    return res.status(404).json({ message: "User not found" });
  }

  const isUserFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isUserFollowed) {
    return res
      .status(400)
      .json({ message: "You are already following this user" });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    followRecord,
  });
}

async function userUnfollowController(req, res) {
  const followeeUsername = req.params.username;
  const followerUsername = req.user.username;

  const isUserFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowed) {
    return res.status(400).json({ message: `You are not following ${followeeUsername}` });
  }

  await followModel.findByIdAndDelete(isUserFollowed._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  });
}

module.exports = {
  userFollowController,
  userUnfollowController,
};
