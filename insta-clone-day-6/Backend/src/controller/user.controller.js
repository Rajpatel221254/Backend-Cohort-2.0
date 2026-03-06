const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const imagekit = require("../config/imagekit.config");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

async function sendFollowRequestController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(409).json({
      message: "You cannot follow yourself",
    });
  }

  const isUserExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isUserExist) {
    return res.status(409).json({
      message: "User not found",
    });
  }

  const isFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isFollowed) {
    return res.status(200).json({
      message: `You already follow ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You follow ${followeeUsername}`,
    followRecord,
  });
}

async function acceptFollowRequestController(req, res) {
  const username = req.user.username;
  const requestId = req.params.id;

  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request is not found",
    });
  }

  const isUserValid = username === followRequest.followee;

  if (!isUserValid) {
    return res.status(404).json({
      message: "Unauthorized access",
    });
  }

  const updatedFollow = await followModel.findByIdAndUpdate(
    requestId,
    {
      status: "accepted",
    },
    { new: true },
  );

  res.status(200).json({
    message: "Follow request accepted",
    data: updatedFollow,
  });
}

async function rejectFollowRequestController(req, res) {
  const username = req.user.username;
  const requestId = req.params.id;

  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request is not found",
    });
  }

  const isUserValid = username === followRequest.followee;

  if (!isUserValid) {
    return res.status(404).json({
      message: "Unauthorized access",
    });
  }

  const updatedFollow = await followModel.findByIdAndUpdate(
    requestId,
    {
      status: "rejected",
    },
    { new: true },
  );

  res.status(200).json({
    message: "Follow request rejected",
    data: updatedFollow,
  });
}

async function getUserAllRequestController(req, res) {
  const followeeUsername = req.user.username;

  const allRequests = await followModel.find({
    followee: followeeUsername,
    status: "pending",
  });

  res.status(200).json({
    message: "Pending Requests",
    allRequests,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(409).json({
      message: "You cannot unfollow yourself",
    });
  }

  const isFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowed) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isFollowed._id);

  res.status(200).json({
    message: `You unfollow ${followeeUsername}`,
  });
}

async function updateUserController(req, res) {
  try {
    const { bio, fullname, username } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      const existingUser = await userModel.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }
    }

    let profilePicUrl = user.profilePic;

    if (req.file) {
      const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "profilePic",
        folder: "insta-clone-profile-pics",
      });

      profilePicUrl = file.url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        bio: bio ?? user.bio,
        fullname: fullname ?? user.fullname,
        username: username ?? user.username,
        profilePic: profilePicUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  sendFollowRequestController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getUserAllRequestController,
  updateUserController,
};
