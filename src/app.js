import { http } from './http';
import { uiCtrl } from './ui';

// Show all the posts
function showAllPosts() {
    http.get('http://localhost:3000/posts')
    .then(data => uiCtrl.showPosts(data));
}


function addPost(e) {
    const titleInput = uiCtrl.titleInput.value;
    const bodyInput = uiCtrl.bodyInput.value;
    
    const data = {
        title: titleInput,
        body: bodyInput,
    }

    if(uiCtrl.isValidData(titleInput, bodyInput)) {
        if(uiCtrl.idInput.value === '') {

            // POST in API
            http.post('http://localhost:3000/posts', data)
            .then(data => {
                // Display the data
                uiCtrl.showAlert('alert alert-success', 'Post Added Successfully');
                showAllPosts();
                uiCtrl.clearAllFields();
            });
    
            uiCtrl.showSuccessPost();
        }else {
            console.log(parseInt(uiCtrl.idInput.value));
            // Update data
            http.put(`http://localhost:3000/posts/${parseInt(uiCtrl.idInput.value)}`, data)
            .then(resData => {
                console.log(resData);
                uiCtrl.showAlert('alert alert-success', 'Post updated');
                uiCtrl.changeState('add');
                showAllPosts();
            });
        }
        
    }else {
        uiCtrl.showErrorMessage(`Please fill this field`, `Please enter your message`, titleInput, bodyInput);
    }

    e.preventDefault();
};

function deletePost(e) {
    e.preventDefault();

    const element = e.target.parentElement;
    if(element.classList.contains('delete')) {
        const postID = element.dataset.id;
        http.delete(`http://localhost:3000/posts/${postID}`)
        .then(data => {
            uiCtrl.removeCard(element.parentElement.parentElement);
        }).catch(err => console.log(err));
    }
};

function editPosts(e) {
    e.preventDefault();

    const element = e.target.parentElement;
    if(element.classList.contains('edit')) {
        // Title, body and post id
        const data = uiCtrl.getMainFields(element.parentElement);
        console.log(data);
        
        // Putting the data in input fields
        uiCtrl.fillFields(data);

        uiCtrl.postSubmit.classList.add('edit-state');

        const edit = document.querySelector('.edit-state');
        edit.addEventListener('click', function(e) {
            updateItem(data);
        });
    }
}

function cancelEdit(e) {
    e.preventDefault();

    if(e.target.classList.contains('post-cancel')) {
        uiCtrl.changeState('add');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', showAllPosts);

// When the post button is pressed 
uiCtrl.postSubmit.addEventListener('click', addPost);

// Delete post
uiCtrl.posts.addEventListener('click', deletePost);

// Edit post
uiCtrl.posts.addEventListener('click', editPosts);

// Cancel edit post
uiCtrl.cardForm.addEventListener('click', cancelEdit);