const linkElement = document.getElementById('link');
const links = [];

// Đọc dữ liệu từ tệp CSV và lưu trữ vào mảng links
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        for (const line of lines) {
            if (line.trim()) {
                links.push(line.trim());
            }
        }

        // Hiển thị liên kết ngẫu nhiên
        showRandomLink();
    });

function showRandomLink() {
    if (links.length > 0) {
        const randomIndex = Math.floor(Math.random() * links.length);
        const randomLink = links[randomIndex];
        linkElement.href = randomLink;
        linkElement.textContent = randomLink;
    }
}
