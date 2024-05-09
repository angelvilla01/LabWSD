## Notion-like App

### Overview
This project is a web application for managing notes. Users can create, edit, delete, and view details of notes through a user-friendly interface. The application is built using HTML, CSS, and JavaScript with server-side rendering using a Node.js backend.

IT'S IMPORTANT THAT YOU USE WSL OR LINUX-BASED SYSTEM DUE TO THE DB MANAGEMENT. 

### Features
1. **List of Notes**: Displays a list of notes. If no notes are available, it shows a message indicating that there are no notes.
2. **Add Note**: Users can create a new note. They need to provide a title, content, and a list of items. Optionally, they can upload an image for the note.
3. **Note Details**: It shows detailed information about a specific note, including its title, content, list items, and an image if available.
4. **Edit Note**: Users can edit an existing note. They can modify the title, content, list items, and update the note. They can also upload a new image for the note.
5. **Friendship Management**:
   - **Get All Relations of User**: Retrieves all friendship relations of the authenticated user.
   - **Send Friendship Request**: Sends a friendship request.
   - **Accept Friendship Request**: Accepts a friendship request.
   - **Reject Friendship Request**: Rejects a friendship request.
   - **Add Friend**: Adds a friend.
   - **Remove Friend**: Removes a friend.
   - **Check Friendship**: Retrieves all friendships of a specific user (Admin only).
6. **Sharing Management**: You can also share notes and collections with your friends.
7. **Collections**: Same things that you do with notes can be done with collections (adding, listing and the notes assigned to them)

### Technologies Used
- **HTML**: Used for structuring the web pages.
- **CSS**: Used for styling the web pages.
- **JavaScript**: Used for client-side scripting, particularly for managing checkbox states and localStorage.
- **Bootstrap**: Utilized for styling and layout components.
- **Node.js**: Used for server-side scripting.
- **Express.js**: Framework used for building the backend server.
- **LocalStorage**: Utilized for storing checkbox states locally.
- **File Upload**: Implemented for uploading images along with notes.

### Usage
1. To run the application, ensure you have Node.js installed on your system.
2. Install the necessary dependencies by running `npm install`.
3. Start the server using `npm run dev`. This way we are using nodemon to edit the files without reloading. 
4. Access the application through a web browser using the provided URLs for each functionality.

### Conclusion
This project provides a straightforward way to manage notes, allowing users to create, edit, delete, and view detailed information about their notes. Additionally, it includes features for managing friendships, enabling users to send, accept, reject, and remove friend requests.