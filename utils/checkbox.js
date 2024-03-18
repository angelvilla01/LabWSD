// checkboxUtils.js

function updateCheckbox(noteId) {
    const checkbox = document.getElementById(`checkbox-${noteId}`);
    const completed = checkbox.checked;

    fetch(`/notes/updateCheckbox/${noteId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}
