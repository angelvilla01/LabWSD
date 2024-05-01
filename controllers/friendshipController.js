import { FriendshipModel } from "../models/friendship.js";
import { UserModel } from "../models/user.js";

export const friendshipController = {

    sendRequest: async (req, res) => {
        console.log('req.body', req.body);
        const  receiver  = req.body.friend_username;
        console.log('receiver', receiver);
        const sender = req.session.user.username;
        const senderUser = await UserModel.findByUsername(sender);
        const senderId = senderUser.id;
        const receiverUser = await UserModel.findByUsername(receiver);
        const receiverId = receiverUser.id;

        const friendship = await FriendshipModel.getAllFriendsOfUser(senderId);
        console.log('friendship', friendship);
        for (const friend of friendship) {
            if (friend.user1 === receiverId || friend.user2 === receiverId) {
                res.send('<script>alert("You are already friends with this user"); window.location.href = "/friendships";</script>');
                return;
            }
        }

        try {
        
        await FriendshipModel.sendRequest(senderId, receiverId, 'friend_request', sender);
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
        res.render('friendshipsManage', { pendingRequests, friends});
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
        const friendId  = req.params.friendId;
        console.log('friendId', friendId);
        const username = req.session.user.username;
        const user = await UserModel.findByUsername(username);
        const userId = user.id;

        try {
        await FriendshipModel.deleteFriend(userId,friendId);
        res.redirect('/friendships');
        } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        }
    }
    };