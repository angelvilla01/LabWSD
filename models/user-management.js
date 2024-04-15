function deleteUser(userId) {
  fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  }).then(() => {
    // Recargar la lista de usuarios después de borrar un usuario
    loadUserList();
  });
}

function deleteNote(noteId) {
  fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
  }).then(() => {
    // Recargar la lista de notas después de borrar una nota
    loadNoteList();
  });
}

function loadUserList() {
  fetch('/api/users')
    .then(response => response.json())
    .then(users => {
      const userList = document.getElementById('user-list');
      userList.innerHTML = '';
      users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user.username;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          deleteUser(user.id);
        });

        userElement.appendChild(deleteButton);
        userList.appendChild(userElement);
      });
    });
}

function loadNoteList() {
  fetch('/api/notes')
    .then(response => response.json())
    .then(notes => {
      const noteList = document.getElementById('notes-list');
      noteList.innerHTML = '';
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.textContent = note.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          deleteNote(note.id);
        });

        noteElement.appendChild(deleteButton);
        noteList.appendChild(noteElement);
      });
    });
}

loadUserList();
loadNoteList();