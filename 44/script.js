// Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, 
// то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.


const API = "https://jsonplaceholder.typicode.com";
const controller = action => fetch(action).then(data => data.json());

let inputSearch = document.querySelector("input[name=searchPost]").value;
const form = document.querySelector(".form");
const cardContainer = document.querySelector(".container");
const comentContainer = document.createElement("div");
const wrapper = document.querySelector(".wrapper");
const btnComments = document.querySelector(".comments");


form.addEventListener("submit", e => {
    e.preventDefault();

    let inputSearch = document.querySelector("input[name=searchPost]").value;
    //console.log(inputSearch)
    if (inputSearch > 0 && inputSearch <= 100) {
        controller(`${API}/posts/${inputSearch}`)
            .then(data => renderCardPosts(cardContainer, data));

    }

    btnComments.addEventListener("click", () => {
        controller(`${API}/posts/${inputSearch}/comments`)
            .then(responce => {
                responce.forEach(coment => {
                    //console.log(coment);
                    const div = document.createElement("div");
                    const h3 = document.createElement("h3");
                    const body = document.createElement("p");
                    const email = document.createElement("p");

                    h3.innerText = `${coment.name}`;
                    body.innerText = `${coment.body}`;
                    email.innerText = `${coment.email}`;

                    div.append(h3);
                    div.append(body);
                    div.append(email);
                    comentContainer.append(div);
                    wrapper.append(comentContainer);

                })
            })

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
    cardContainer.append(postCard);
}


