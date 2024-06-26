import express from 'express';
const friendshipRouter = express.Router();
import { friendshipController } from '../controllers/friendshipController.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdminAuth } from '../middlewares/auth.js';

friendshipRouter.get('/', requireAuth, friendshipController.getAllRelationsOfUser);
friendshipRouter.post('/sendRequest/', requireAuth, friendshipController.sendRequest);
friendshipRouter.post('/acceptRequest/:senderId/:receiverId', requireAuth, friendshipController.acceptRequest);
friendshipRouter.post('/rejectRequest/:senderId/:receiverId', requireAuth, friendshipController.rejectRequest);
friendshipRouter.post('/addFriend', requireAuth, friendshipController.addFriend);
friendshipRouter.post('/removeFriend/:friendId', requireAuth, friendshipController.deleteFriend);

friendshipRouter.post('/removeFriend/:friendId/:userId', requireAuth, friendshipController.deleteFriend);
friendshipRouter.get('/checkFriendship/:userId', requireAdminAuth, friendshipController.getAllFriendsOfUser);
export { friendshipRouter };