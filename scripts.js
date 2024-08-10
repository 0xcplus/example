document.addEventListener('DOMContentLoaded', function() {
    const progressForm = document.getElementById('progress-form');
    const progressText = document.getElementById('progress-text');
    const photoUpload = document.getElementById('photo-upload');
    const fileUpload = document.getElementById('file-upload');
    const progressList = document.getElementById('progress-list');
    const projectList = document.getElementById('project-list');

    // Handle progress form submission
    progressForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const progressEntry = progressText.value.trim();
        const photoFile = photoUpload.files[0];
        const otherFile = fileUpload.files[0];

        const li = document.createElement('li');
        
        if (progressEntry) {
            li.textContent = progressEntry;
        }

        if (photoFile) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(photoFile);
            li.appendChild(img);
        }

        if (otherFile) {
            const fileLink = document.createElement('a');
            fileLink.href = URL.createObjectURL(otherFile);
            fileLink.download = otherFile.name;
            fileLink.textContent = `Download ${otherFile.name}`;
            li.appendChild(fileLink);
        }

        progressList.appendChild(li);
        progressText.value = ''; 
        photoUpload.value = ''; 
        fileUpload.value = ''; 
    });

    // Example: Add some projects
    const projects = ['Project 1', 'Project 2', 'Project 3'];
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project;
        projectList.appendChild(li);
    });
});
