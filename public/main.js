document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch admin data (for admin.html)
  async function loadSubmissions() {
    const response = await fetch('/admin');
    const submissions = await response.json();
    const dashboard = document.getElementById('dashboard');

    submissions.forEach(submission => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${submission.name} (${submission.handle})</h3>
        <div>${submission.images.map(img => `<img src="${img}" width="100">`).join('')}</div>
      `;
      dashboard.appendChild(div);
    });
  }

  // Load submissions if on admin page
  if (document.getElementById('dashboard')) {
    loadSubmissions();
  }
});
