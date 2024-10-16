const submissionsContainer = document.getElementById('submissions-container');

fetch('http://localhost:5000/api/submissions')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        data.forEach(submission => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-submission');

            const userInfo = `
                <p><strong>Name:</strong> ${submission.name}</p>
                <p><strong>Social Handle:</strong> ${submission.socialHandle}</p>
                <div class="image-container">
                    ${submission.images.map(img => `<img src="http://localhost:5000/${img}" alt="User Image" />`).join('')}
                </div>
            `;

            userDiv.innerHTML = userInfo;
            submissionsContainer.appendChild(userDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching submissions:', error);
        submissionsContainer.innerHTML = '<p>Error fetching submissions. Please try again later.</p>';
    });
