let page = 1;
console.log('Page 2 loading...');
const postsContainer = document.getElementById('posts-container');

function loadPosts() {
    console.log('LoadPosts loading... in function');
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });
            page++;
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

function handleScroll() {
    const buffer = 1; // Value for how sensitive scroll event is lower means less sensitive, may fail, higher, means loads more
    //for me 1 works fine.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - buffer) {
        loadPosts();
    }
}

window.addEventListener('scroll', handleScroll);

// Initial load
loadPosts();
