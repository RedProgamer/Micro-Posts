class UI {
    constructor() {
        this.posts = document.getElementById('posts');
        this.titleInput = document.getElementById('title');
        this.bodyInput = document.getElementById('body');
        this.idInput = document.getElementById('id');
        this.postSubmit = document.querySelector('.post-submit');
        this.cardForm = document.querySelector('.card-form');
        this.forState = 'add';
    }

    showPosts(data) {
        let output = "";

        data.forEach(function(post) {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `;

            posts.innerHTML = output;
        });
    }

    getMainFields(element) {
        console.log(element);

        const title = element.querySelector('.card-title').textContent;
        const text = element.querySelector('.card-text').textContent;
        const postID = element.querySelector('.edit').dataset.id;

        return {
            title,
            body: text,
            id: parseInt(postID),
        }
    }

    fillFields(data) {
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;

        this.changeState('edit');
    }

    changeState(state) {
        if(state === 'edit') {
            this.postSubmit.textContent = `Update Post`;
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            // Cancel Button
            const cancel_button = document.createElement('button');
            cancel_button.className = 'post-cancel btn btn-light btn-block';
            cancel_button.appendChild(document.createTextNode('Cancel Edit'));

            // Get parent
            this.cardForm = document.querySelector('.card-form');
            // Get element to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert cancel button
            this.cardForm.insertBefore(cancel_button, formEnd);
        }else {
            this.postSubmit.textContent = `Post It`;
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // Clear ID
            this.clearIdInput();
            // Clear Text Fields
            this.clearAllFields();
        }
    }

    isValidData(title, body) {
        return title.trim().length > 0 && body.trim().length > 0;
    }

    showAlert(className, message) {
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        // Parent Element
        const container = document.querySelector('.postsContainer');
        // Get Posts
        const post = this.posts;
        // Insert alert div
        container.insertBefore(div, post);

        // Remove after 2s
        setTimeout(() => {
            this.clearAlert();
        }, 2000);
    }


    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    showErrorMessage(msg1, msg2, title, body) {
        // Title content
        const titleParent = this.titleInput.parentElement;

        if(title.trim().length > 0) {
            titleParent.classList.remove('error');
        }else if(!titleParent.classList.contains('error')) {
            titleParent.classList.add('error');
        }

        const smallTitle = titleParent.querySelector('small');
        smallTitle.textContent = msg1;
        
        // Body content
        const bodyParent = this.bodyInput.parentElement;

        if(body.trim().length > 0) {
            bodyParent.classList.remove('error');
        }else if(!bodyParent.classList.contains('error')) {
            bodyParent.classList.add('error');
        }

        const smallBody = bodyParent.querySelector('small');
        smallBody.textContent = msg2;
    }

    showSuccessPost() {
        const titleField = this.titleInput.parentElement;
        titleField.classList.remove('error');

        const bodyField = this.bodyInput.parentElement;
        bodyField.classList.remove('error');
    }

    removeCard(target) {
        target.remove();
        this.showAlert('alert alert-success', 'Post was removed');
    }

    clearIdInput() {
        this.idInput.value = '';
    }

    clearAllFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
};


export const uiCtrl = new UI();