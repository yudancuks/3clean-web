const tagContainer = document.getElementById('tagContainer');
const input = document.getElementById('tagInput');
const productsField = document.getElementById('products'); // Hidden input field

// Function to create a tag element
function createTag(value) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `
        ${value}
        <span class="delete-btn">&times;</span>
    `;

    // Add event listener to delete button
    tag.querySelector('.delete-btn').addEventListener('click', () => {
        tagContainer.removeChild(tag);
        updateProductsField(); // Update the hidden field after removing a tag
    });

    tagContainer.insertBefore(tag, input); // Insert tag before input field
    updateProductsField(); // Update the hidden field after adding a tag
}

// Listen for input keydown events
input.addEventListener('keydown', function (event) {
    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault(); // Prevent space or enter from typing
        const value = input.value.trim();
        if (value) {
            createTag(value);
            input.value = ''; // Clear input
        }
    }
});

// Function to update the hidden field value
function updateProductsField() {
    const tags = Array.from(tagContainer.querySelectorAll('.tag'))
        .map(tag => tag.textContent.trim().replace('×', '').trim()); // Remove delete button text
    productsField.value = JSON.stringify(tags); // Save as JSON array in the hidden field
}

function populateTags(data) {
    data.forEach(item => createTag(item));
}