// 썸네일 이미지 클릭 시 모달 열기
$('.imgs').on('click', function() {
    $('#imageModal').css('display', 'block'); // 모달 열기
    $('#modalImage').attr('src', $(this).attr('src')); // 클릭한 이미지 소스 가져오기
    $('#caption').text($(this).attr('alt')); // 이미지 설명 가져오기 (alt 속성)
});

// 모달 닫기
$('.close').on('click', function() {
    $('#imageModal').css('display', 'none'); // 모달 닫기
});

// 모달 외부 클릭 시 닫기
$(window).on('click', function(event) {
    if ($(event.target).is('#imageModal')) {
        $('#imageModal').css('display', 'none'); // 모달 닫기
    }
});