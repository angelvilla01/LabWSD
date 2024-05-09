**Note Routes**

1. **Get All Notes**
   - Method: GET
   - Route: `/notes/`
   - Middleware: `requireAuth`
   - Controller: `notesController.getAllNotesFromUser`
   - Description: Returns all notes for the authenticated user.

2. **Create a New Note**
   - Method: POST
   - Route: `/notes/new`
   - Middleware: `requireAuth`
   - Controller: `notesController.createNote`
   - Description: Creates a new note for the authenticated user.

3. **Get Note by ID**
   - Method: GET
   - Route: `/notes/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.getNoteById`
   - Description: Retrieves a specific note by its ID for the authenticated user.

4. **Update Note**
   - Method: POST
   - Route: `/notes/edit/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.updateNote`
   - Description: Updates an existing note by its ID for the authenticated user.

5. **Delete Note**
   - Method: POST
   - Route: `/notes/delete/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.deleteNote`
   - Description: Deletes an existing note by its ID for the authenticated user.

6. **Get All Collections**
   - Method: GET
   - Route: `/notes/collections`
   - Middleware: `requireAuth`
   - Controller: `collectionsController.getAllCollectionsFromUser`
   - Description: Returns all note collections for the authenticated user.

7. **Create Collection**
   - Method: POST
   - Route: `/notes/collections/addCollection`
   - Middleware: `requireAuth`
   - Controller: `collectionsController.createCollection`
   - Description: Creates a new note collection for the authenticated user.

8. **Get Notes in Collection**
   - Method: GET
   - Route: `/notes/collections/notesInCollection/:collectionId`
   - Middleware: `requireAuth`
   - Controller: `collectionsController.getNotesInCollection`
   - Description: Retrieves all notes within a specific collection by its ID for the authenticated user.

9. **Delete Collection**
   - Method: POST
   - Route: `/notes/collections/delete/:collectionId`
   - Middleware: `requireAuth`
   - Controller: `collectionsController.deleteCollection`
   - Description: Deletes an existing note collection by its ID for the authenticated user.


**Sharing Routes**

1. **Get Shared Notes**
    - Method: GET
    - Route: `/notes/shared`
    - Middleware: `requireAuth`
    - Controller: `shareController.getSharedNotesWithUser`
    - Description: Retrieves all notes shared with the authenticated user.

2. **Share Note with User**
    - Method: POST
    - Route: `/notes/shared/addUserToShareWith/:noteId/:friendId`
    - Middleware: `requireAuth`
    - Controller: `shareController.shareNote`
    - Description: Shares a specific note with another user by their ID for the authenticated user.

**User Routes**

1. **Get All Users**
    - Method: GET
    - Route: `/users/allUsers`
    - Middleware: `requireAdminAuth`
    - Controller: `userController.getAllUsers`
    - Description: Retrieves all registered users (Admin only).

2. **Register User**
    - Method: POST
    - Route: `/users/register`
    - Controller: `userController.register`
    - Description: Registers a new user in the system.

3. **Login**
    - Method: POST
    - Route: `/users/login`
    - Controller: `userController.login`
    - Description: Logs a user into the system.

4. **Logout**
    - Method: GET
    - Route: `/users/logout`
    - Controller: `userController.logout`
    - Description: Logs out the authenticated user.

5. **Delete User**
    - Method: POST
    - Route: `/users/delete/:userId`
    - Controller: `userController.delete`
    - Description: Deletes an existing user by their ID (Admin only).

6. **User Management**
    - Method: GET
    - Route: `/users/management`
    - Middleware: `requireAdminAuth`
    - Controller: N/A
    - Description: View for user management (Admin only).

**Friendship Routes**

1. **Get All Relations of User**
   - Method: GET
   - Route: `/friendships/`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.getAllRelationsOfUser`
   - Description: Retrieves all friendship relations of the authenticated user.

2. **Send Friendship Request**
   - Method: POST
   - Route: `/friendships/sendRequest/`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.sendRequest`
   - Description: Sends a friendship request.

3. **Accept Friendship Request**
   - Method: POST
   - Route: `/friendships/acceptRequest/:senderId/:receiverId`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.acceptRequest`
   - Description: Accepts a friendship request.

4. **Reject Friendship Request**
   - Method: POST
   - Route: `/friendships/rejectRequest/:senderId/:receiverId`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.rejectRequest`
   - Description: Rejects a friendship request.

5. **Add Friend**
   - Method: POST
   - Route: `/friendships/addFriend`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.addFriend`
   - Description: Adds a friend.

6. **Remove Friend**
   - Method: POST
   - Route: `/friendships/removeFriend/:friendId`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.deleteFriend`
   - Description: Removes a friend.

7. **Remove Friend (Admin)**
   - Method: POST
   - Route: `/friendships/removeFriend/:friendId/:userId`
   - Middleware: `requireAuth`
   - Controller: `friendshipController.deleteFriend`
   - Description: Removes a friend.

8. **Check Friendship**
   - Method: GET
   - Route: `/friendships/checkFriendship/:userId`
   - Middleware: `requireAdminAuth`
   - Controller: `friendshipController.getAllFriendsOfUser`
   - Description: Retrieves all friendships of a specific user (Admin only).
