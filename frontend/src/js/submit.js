document.getElementById('submission-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try {
      const response = await fetch('http://localhost:5000/api/submissions', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          alert('Submission successful!');
          e.target.reset(); // Reset form after submission
      } else {
          alert('Submission failed. Please try again.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console.');
  }
});


document.getElementById('admin-view').addEventListener('click', async (e) => {
  window.location.href = '/dashboard';
});