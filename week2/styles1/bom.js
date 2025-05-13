// 1. Declare variables referencing DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // Assuming your ul has id="list"

// Note: You'll need to replace '#list' with the actual selector for your unordered list element
// For example, if your HTML has <ul class="chapter-list">, use '.chapter-list'
// Or if it's <ul id="chapter-list">, use '#chapter-list'

// 2. Create click event listener for the button
button.addEventListener('click', () => {
    // 3. Check if input is not empty
    if (input.value.trim() !== '') {
        // 4. Create list item element
        const listItem = document.createElement('li');
        
        // 5. Create delete button
        const deleteButton = document.createElement('button');
        
        // 6. Populate list item with input value
        listItem.textContent = input.value;
        
        // 7. Set delete button content
        deleteButton.textContent = '❌';
        
        // 8. Add delete button to list item
        listItem.appendChild(deleteButton);
        
        // 9. Add list item to the unordered list
        list.appendChild(listItem);
        
        // 10. Clear the input field
        input.value = '';
        
        // 11. Set focus back to the input field
        input.focus();
        
        // 12. Add event listener to delete button
        deleteButton.addEventListener('click', () => {
            list.removeChild(listItem);
            input.focus();
        });
    } else {
        // If input is empty, focus on it
        input.focus();
    }
});