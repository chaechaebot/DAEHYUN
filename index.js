document.addEventListener('DOMContentLoaded', () => {
    const noticeList = document.getElementById('notice-list');
    const noticeForm = document.getElementById('notice-form');
    const searchBar = document.getElementById('search-bar');
    let notices = JSON.parse(localStorage.getItem('notices')) || [
        { title: "개학 안내", content: "개학일은 2024년 9월 1일입니다." },
        { title: "중간고사 일정", content: "중간고사는 2024년 10월 15일부터 2024년 10월 20일까지입니다." },
        { title: "기말고사 일정", content: "기말고사는 2024년 12월 10일부터 2024년 12월 15일까지입니다." }
    ];

    // 공지사항 목록 렌더링
    function renderNotices(filteredNotices = notices) {
        noticeList.innerHTML = '';
        filteredNotices.forEach((notice, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <h4>${notice.title}</h4>
                    <p>${notice.content}</p>
                    ${notice.file ? `<a href="${notice.file}" download>${notice.fileName}</a>` : ''}
                </div>
                <button class="delete-btn" data-index="${index}">삭제</button>
            `;
            noticeList.appendChild(listItem);
        });
    }

    // 공지사항 추가
    noticeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('notice-title').value;
        const content = document.getElementById('notice-content').value;
        const fileInput = document.getElementById('notice-file');
        let fileData = null, fileName = '';

        if (fileInput.files[0]) {
            fileData = URL.createObjectURL(fileInput.files[0]);
            fileName = fileInput.files[0].name;
        }

        notices.push({ title, content, file: fileData, fileName });
        localStorage.setItem('notices', JSON.stringify(notices));
        renderNotices();
        noticeForm.reset();
    });

    // 공지사항 삭제
    noticeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            notices.splice(index, 1);
            localStorage.setItem('notices', JSON.stringify(notices));
            renderNotices();
        }
    });

    // 공지사항 검색 기능
    searchBar.addEventListener('input', function(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredNotices = notices.filter(notice =>
            notice.title.toLowerCase().includes(searchTerm) ||
            notice.content.toLowerCase().includes(searchTerm)
        );
        renderNotices(filteredNotices);
    });

    // 초기 렌더링
    renderNotices();
});

// 현재 페이지에서 필요한 동적 기능을 추가할 수 있습니다.
document.addEventListener("DOMContentLoaded", () => {
    console.log("페이지가 로드되었습니다.");
  });
