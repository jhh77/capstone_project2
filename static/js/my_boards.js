//게시글 내용 150자까지 보이고 ...더보기 표시하기
$('.post-content').each(function() {
    const content = $(this).text().trim();
    if (content.length >= 150) {
        const shortContent = content.substr(0, 150); // 150글자까지 자르기
        $(this).html(shortContent + '<span class="text-light">...더보기</span>'); // "더보기" 링크 추가
    }
});