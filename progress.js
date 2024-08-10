document.addEventListener('DOMContentLoaded', function() {
    const progressForm = document.getElementById('progress-form');
    const entriesList = document.getElementById('entries');
    const backupButton = document.getElementById('backup');

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('progressEntries')) || [];
        entriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${entry.date} - ${entry.title}</strong>
                <p>${entry.description}</p>
                ${entry.file ? `<a href="${entry.file}" download>Download File</a>` : ''}
                <button onclick="deleteEntry(${index})">삭제</button>
            `;
            entriesList.appendChild(li);
        });
    }

    function saveEntry(event) {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : null;

        const newEntry = { date, title, description, file };

        const entries = JSON.parse(localStorage.getItem('progressEntries')) || [];
        entries.push(newEntry);
        localStorage.setItem('progressEntries', JSON.stringify(entries));

        loadEntries();
        progressForm.reset();
    }

    window.deleteEntry = function(index) {
        const entries = JSON.parse(localStorage.getItem('progressEntries')) || [];
        entries.splice(index, 1);
        localStorage.setItem('progressEntries', JSON.stringify(entries));
        loadEntries();
    }

    function backupEntries() {
        const entries = JSON.parse(localStorage.getItem('progressEntries')) || [];
        const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'progress-backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    progressForm.addEventListener('submit', saveEntry);
    backupButton.addEventListener('click', backupEntries);

    loadEntries();
});
