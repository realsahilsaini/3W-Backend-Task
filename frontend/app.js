document.getElementById('submissionForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('handle', document.getElementById('handle').value);

  const files = document.getElementById('images').files;
  for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
  }

  try {
      const response = await fetch('http://localhost:5000/api/submit', {
          method: 'POST',
          body: formData
      });
      const result = await response.json();
      alert(result.message);
  } catch (error) {
      console.error('Error:', error);
  }
});
