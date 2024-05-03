window.onload = function() {
    fetch(https://docs.google.com/spreadsheets/d/1BjdhXuDmgQvNo0OvXrIONtQz0Ast0-Nz2o2asBuIj5c/edit?usp=sharing)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            const randomIndex = Math.floor(Math.random() * data.length);
            const title = data[randomIndex].title;
            const links = data[randomIndex].links;
            contentDiv.innerHTML = `<h1>${title}</h1>`;
            const ul = document.createElement('ul');
            links.forEach(link => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${link}">${link}</a>`;
                ul.appendChild(li);
            });
            contentDiv.appendChild(ul);
        })
        .catch(error => console.error('Error:', error));
};
