// Handle form submission
const form = document.getElementById('submission-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('handle', document.getElementById('handle').value);

    const images = document.getElementById('images').files;
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }

    const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Submission successful!');
    } else {
        alert('Error submitting form');
    }
});

// Fetch and display submissions in dashboard
if (window.location.pathname === '/dashboard.html') {
    const submissionsContainer = document.getElementById('submissions-container');

    fetch('http://localhost:5000/api/submissions')
        .then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(submissions => {
            console.log('Submissions:', submissions);
            submissions.forEach(submission => {
                const submissionElement = document.createElement('div');
                submissionElement.innerHTML = `
                    <h2>${submission.name}</h2>
                    <p>Handle: ${submission.handle}</p>
                    <div>${submission.images.map(image => `<img src="${image}" width="100" />`).join('')}</div>
                    <hr>
                `;
                submissionsContainer.appendChild(submissionElement);
            });
        })
        .catch(error => {
            console.error('Error fetching submissions:', error);
        });
}
