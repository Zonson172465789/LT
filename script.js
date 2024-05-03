// Lấy dữ liệu từ Google Sheet
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1BjdhXuDmgQvNo0OvXrIONtQz0Ast0-Nz2o2asBuIj5c/edit?usp=sharing';
fetch(sheetUrl)
  .then(response => response.json())
  .then(data => {
    const sheetData = data.sheets[0].data;

    // Lấy tiêu đề ngẫu nhiên từ cột F
    const randomTitleIndex = Math.floor(Math.random() * sheetData.length);
    const title = sheetData[randomTitleIndex][5];
    document.getElementById('title').textContent = title.toUpperCase();

    // Lấy 5 link ngẫu nhiên từ cột D
    const randomLinks = [];
    for (let i = 0; i < 5; i++) {
      const randomLinkIndex = Math.floor(Math.random() * sheetData.length);
      const link = sheetData[randomLinkIndex][3];
      if (!randomLinks.includes(link)) {
        randomLinks.push(link);
      }
    }

    // Hiển thị các link
    const linksList = document.getElementById('links');
    randomLinks.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.textContent = link;
      linksList.appendChild(linkElement);
    });
  });

// Thêm chức năng đóng web
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => {
  window.close();
});
