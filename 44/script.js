// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, 
// то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.


const API = "https://jsonplaceholder.typicode.com";
const controller = action => fetch(action).then(data => data.json()).catch(error => console.error(error));

let inputSearch = document.querySelector("input[name=searchPost]").value;
const form = document.querySelector(".form");
const cardContainer = document.querySelector(".container");

const btnComments = document.querySelector(".comments");
// btnComments.innerText = "Coments";



form.addEventListener("submit", e => {
    e.preventDefault();

    let inputSearch = document.querySelector("input[name=searchPost]").value;
    //console.log(inputSearch)
    if (inputSearch > 0 && inputSearch <= 100) {
        controller(`${API}/posts/${inputSearch}`)
            .then(data => renderCardPosts(cardContainer, data));

    }

        btnComments.addEventListener("submit", e => {
            e.preventDefault();

                controller(`${API}/comments`)
                .then(data => {
                    data.forEach(comments => {
                    if (inputSearch.value === comments.id) {
                        renderComments(cardContainer, data);
                    }
                })
            });
    })

})

// fetch(`${API}/posts`)
//     .then(data => data.json())
//     .then(response => console.log(response))

// fetch(`${API}/comments`)
//     .then(data => data.json())
//     .then(response => console.log(response))

function renderCardPosts(container, post) {
    //console.log(post);
    const postCard = document.createElement("div");
    const titlePost = document.createElement("h2");
    const divCard = document.createElement("p");

    postCard.classList.add("post");
    titlePost.classList.add("title");
    divCard.classList.add("card");

    titlePost.innerText = post.title;
    divCard.innerText = post.body;

    postCard.append(titlePost);
    postCard.append(divCard);
    container.append(postCard);

}



function renderComments(container, comments) {
    const commentName = document.createElement("h2");

    commentName.innerText = comments.name;

    container.append(commentName);
}

