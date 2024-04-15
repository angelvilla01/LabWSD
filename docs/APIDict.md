### Note Routes (`notesRouter`):
1. **Get All Notes**
   - Method: GET
   - Route: `/notes/`
   - Middleware: `requireAuth`
   - Controller: `notesController.getAllNotes`

2. **Create New Note**
   - Method: POST
   - Route: `/notes/new`
   - Middleware: `requireAuth`
   - Controller: `notesController.createNote`

3. **Get Note Details**
   - Method: GET
   - Route: `/notes/noteInfo/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.getNoteById`

4. **Edit Note**
   - Method: GET (to fetch details of the note to edit)
   - Route: `/notes/edit/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.getNoteById`
   
   - Method: POST (to update the note)
   - Route: `/notes/edit/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.updateNote`

5. **Delete Note**
   - Method: POST
   - Route: `/notes/delete/:noteId`
   - Middleware: `requireAuth`
   - Controller: `notesController.deleteNote`

### User Routes (`userRouter`):
1. **User Registration**
   - Method: POST
   - Route: `/users/register`
   - Controller: `userController.register`

2. **User Login**
   - Method: POST
   - Route: `/users/login`
   - Controller: `userController.login`

3. **User Logout**
   - Method: GET
   - Route: `/users/logout`
   - Controller: `userController.logout`

4. **Delete User** (not controlled yet)
   - Method: POST
   - Route: `/users/delete`
   - Controller: `userController.delete`

### Middleware:
1. **Require Auth**
   - Middleware to verify if the user is authenticated.
   - Redirects the user to the login page if not authenticated.

