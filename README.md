## Notion like app

### Overview
This project is a web application for managing notes. Users can create, edit, delete, and view details of notes through a user-friendly interface. The application is built using HTML, CSS, and JavaScript with server-side rendering using a Node.js backend.

IT'S IMPORTANT THAT YOU USE WSL OR LINUX-BASED SYSTEM DUE TO THE DB MANAGEMENT. 

### Files
- **index.ejs**: Displays a list of notes. Users can see the title of each note along with options to edit, delete, and mark notes as completed.
- **new.ejs**: Provides a form for users to create a new note. Users can input a title, content, and a list of items. They can also upload an image for the note.
- **noteInfo.ejs**: Displays details of a specific note including its title, content, list items, and an optional image if available.
- **edit.ejs**: Allows users to edit an existing note. Users can modify the title, content, list items, and update the note. They can also upload a new image for the note.

### Features
1. **List of Notes**: The index.html file displays a list of notes. If no notes are available, it shows a message indicating that there are no notes.
2. **Add Note**: Users can create a new note using the new.ejs file. They need to provide a title, content, and a list of items. Optionally, they can upload an image for the note.
3. **Note Details**: The noteInfo.ejs file shows detailed information about a specific note, including its title, content, list items, and an image if available.
4. **Edit Note**: Users can edit an existing note using the edit.ejs file. They can modify the title, content, list items, and update the note. They can also upload a new image for the note.

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
This project provides a straightforward way to manage notes, allowing users to create, edit, delete, and view detailed information about their notes.