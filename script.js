// Lấy dữ liệu từ Google Sheet
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1BjdhXuDmgQvNo0OvXrIONtQz0Ast0-Nz2o2asBuIj5c/edit?usp=sharing';

const loadingElement = document.getElementById('loading');
const webElement = document.getElementById('web');

// Kiểm tra localStorage
const cachedData = localStorage.getItem('webData');
if (cachedData) {
  renderWeb(JSON.parse(cachedData));
} else {
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

      // Lưu trữ dữ liệu vào localStorage
      const webData = {
        title,
        links: randomLinks
      };
      localStorage.setItem('webData', JSON.stringify(webData));

      // Ẩn thông báo tải dữ liệu
      loadingElement.style.display = 'none';
      webElement.style.display = 'block';
    })
    .catch(error => {
      console.error('Lỗi tải dữ liệu:', error);
      alert('Lỗi tải dữ liệu từ bảng tính. Vui lòng thử lại sau.');

      // Ẩn thông báo tải dữ liệu
      loadingElement.style.display = 'none';
    });
}

function renderWeb(data) {
  document.getElementById('title').textContent = data.title.toUpperCase();

  const linksList = document.getElementById('links');
  linksList.innerHTML = ''; // Xóa nội dung cũ

  data.links.forEach(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = link;
    linksList.appendChild(linkElement);
  });

  // Ẩn thông báo tải dữ liệu
  loadingElement.style.display = 'none';
  webElement.style.display = 'block';
}

// Thêm chức năng đóng web
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => {
  window.close();
});
