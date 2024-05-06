import { FriendshipModel } from "../models/friendship.js";
import { ShareModel } from "../models/share.js";
import { UserModel } from "../models/user.js";

export const friendshipController = {

    getFriendsToShareWithCollection: async (req, res) => {
        try {
            const collectionId = req.params.collectionId;
            const username = req.session.user.username;
            const user = await UserModel.findByUsername(username);
            const userId = user.id;
            const friendsTable = await FriendshipModel.getAllFriendsOfUser(userId);
            const friends = [];
            for (const friend of friendsTable) {
                const friendId = friend.user1 === userId ? friend.user2 : friend.user1;
                const username = await UserModel.getUsernameById(friendId);
                const user = await UserModel.findByUsername(username);
                friends.push(user);
            }

            const sharedCollections = await ShareModel.getSharedCollections(collectionId);
            const filterFriends = []
            for (const friend of friends) {
                let shared = false;
                for (const collection of sharedCollections) {
                    if (collection.shared_with === friend.id) {
                        shared = true;
                        break;
                    }
                }
                if (!shared) {

                    filterFriends.push(friend);
                }
            }
            res.render('collectionsSharing', { filterFriends, collectionId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },


    getFriendsToShareWith: async (req, res) => {
        try {

            const noteId = req.params.noteId;
            const username = req.session.user.username;
            const user = await UserModel.findByUsername(username);
            const userId = user.id;
            const friendsTable = await FriendshipModel.getAllFriendsOfUser(userId);
            const friends = [];
            for (const friend of friendsTable) {
                const friendId = friend.user1 === userId ? friend.user2 : friend.user1;
                const username = await UserModel.getUsernameById(friendId);
                const user = await UserModel.findByUsername(username);
                friends.push(user);
            }

            const sharedNotes = await ShareModel.getSharedNotes(noteId);
            const filterFriends = []
            for (const friend of friends) {
                let shared = false;
                for (const note of sharedNotes) {
                    if (note.shared_with === friend.id) {
                        shared = true;
                        break;
                    }
                }
                if (!shared) {
                    filterFriends.push(friend);
                }
            }


            res.render('noteSharing', { filterFriends, noteId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    sendRequest: async (req, res) => {
        console.log('req.body', req.body);
        const receiver = req.body.friend_username;
        console.log('receiver', receiver);
        const sender = req.session.user.username;
        const senderUser = await UserModel.findByUsername(sender);
        const senderId = senderUser.id;
        const receiverUser = await UserModel.findByUsername(receiver);
        const receiverId = receiverUser.id;

        const friendship = await FriendshipModel.getAllFriendsOfUser(senderId);
        console.log('friendship', friendship);
        if (senderId === receiverId) {
            res.send('<script>alert("You cannot send a friend request to yourself"); window.location.href = "/friendships";</script>');
            return;
        }
        for (const friend of friendship) {
            if (friend.user1 === receiverId || friend.user2 === receiverId) {
                res.send('<script>alert("You are already friends with this user"); window.location.href = "/friendships";</script>');
                return;
            }
        }

        try {

            const requested = await FriendshipModel.checkIfAlreadyRequested(senderId, receiverId);
            console.log('requested', requested);
            if (requested) {
                res.send('<script>alert("Friend request already sent"); window.location.href = "/friendships";</script>');
                return;
            } else {


                await FriendshipModel.sendRequest(senderId, receiverId, 'friend_request', sender);
                //res.redirect('/friendships');
            }
            res.redirect('/friendships');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    acceptRequest: async (req, res) => {
        const { senderId, receiverId } = req.params;
        try {

            await FriendshipModel.acceptRequest(senderId, receiverId);

            res.redirect('/friendships');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    rejectRequest: async (req, res) => {
        const { senderId, receiverId } = req.params;
        try {
            await FriendshipModel.rejectRequest(senderId, receiverId);
            res.redirect('/friendships');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    getAllRelationsOfUser: async (req, res) => {
        try {
            const username = req.session.user.username;
            const user = await UserModel.findByUsername(username);
            const userId = user.id;

            //const senderUsername = await UserModel.getUsernameById(userId);
            console.log('userId', userId);
            const pendingRequests = await FriendshipModel.getAllRequestsOfUser(userId);

            const friendsTable = await FriendshipModel.getAllFriendsOfUser(userId);
            console.log('friendsTable', friendsTable);
            const friends = [];
            for (const friend of friendsTable) {
                const friendId = friend.user1 === userId ? friend.user2 : friend.user1;
                const username = await UserModel.getUsernameById(friendId);
                const user = await UserModel.findByUsername(username);
                friends.push(user);
            }
            console.log('requests', pendingRequests);
            res.render('friendshipsManage', { pendingRequests, friends, username });
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    addFriend: async (req, res) => {
        const { friend } = req.body;
        const username = req.session.user.username;

        try {
            await FriendshipModel.addFriend(username, friend);
            res.redirect('/friends/allFriends');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteFriend: async (req, res) => {
        console.log('req.params', req.params);
        const friendId = req.params.friendId;
        console.log('friendId', friendId);
        const username = req.session.user.username;
        const user = await UserModel.findByUsername(username);
        const userId = user.id;

        try {
            await FriendshipModel.deleteFriend(userId, friendId);
            res.redirect('/friendships');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
};