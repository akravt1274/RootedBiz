// document.addEventListener('DOMContentLoaded', () => {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const category = document.querySelector('#business-category').value;
    const name = document.querySelector('#business-name').value.trim();    
    const description = document.querySelector('#business-desc').value.trim();
    const address = document.querySelector('#business-address').value.trim();

    if (name && address && description && category) {
      const response = await fetch('/api/business', {
        method: 'POST',
        body: JSON.stringify({ category, name, description, address }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create business');
      }
    };
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/business/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete business');
      }
    }
  };

  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);

  document
    .querySelector('.project-list')
    .addEventListener('submit', delButtonHandler);
