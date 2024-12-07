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


//모달창 뜨게 하기
const modal = $('#modal'); //모달 변수에 저장

$('.delete-btn').on('click', function() { //삭제하기 버튼 누르면 모달창 뜨기
    modal.slideDown();
});

$('.closePopup').on('click', function() { // 아니오를 누르면 모달창이 사라지기
    modal.slideUp();
});

$('.btn-close').on('click', function() { // X를 누르면 모달창이 사라지기
    modal.slideUp();
});

//수정하기, 삭제하기 버튼 뜨고 사라지게 하기
$('#dots-btn').on('click', function() { //...점 버튼 눌렀을 때
    if ($('.edit-btn').is(':hidden')) { //버튼이 안 보이는 상태면
        $('.delete-btn').slideDown(function() { //버튼이 뜨도록
            $('.edit-btn').slideDown();
        });
    } else {
        $('.edit-btn').slideUp('fast', function() { //버튼이 떠있으면 사라지도록
            $('.delete-btn').slideUp('fast');
        });
    }
});