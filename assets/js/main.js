"use strict";

async function getResponse() {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    let posts = data.products;

    posts.slice(0, 15).forEach((element) => {
        document.querySelector(".posts").innerHTML += `
            <div data-index="${element.id}" class="post">
                <div class="post__title">${element.title}</div>
                <div class="image">
                    <img src="${element.images[0]}" alt="${element.title}">
                </div>
            </div>
        `;
    });
}

getResponse();

document.querySelector(".posts").addEventListener("click", function (event) {
    let target = event.target.closest(".post");
    if (!target) return;

    document.querySelector(".posts").style.display = "none";
    let postId = target.dataset.index;

    async function getPost() {
        let response = await fetch(`https://dummyjson.com/products/${postId}`);
        let post = await response.json();

        document.querySelector(".full__post").innerHTML = `
            <div class="post">
                <div class="title">${post.title}</div>
                <div class="description">${post.description}</div>
                <div class="price">$${post.price}</div>
                <div class="image"><img src="${post.images[0]}" width="200" alt="${post.title}"></div>
                <a href="#" class="btn">Назад</a>
            </div>
        `;
        document.querySelector(".full__post").style.display = "block"; // Show the full post

        document.querySelector(".btn").addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(".full__post").innerHTML = "";
            document.querySelector(".full__post").style.display = "none"; // Hide the full post
            document.querySelector(".posts").style.display = "grid"; // Show the posts grid
        });
    }
    getPost();
});
