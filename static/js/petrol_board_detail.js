
// // 지도 생성
let lat = latitude; // Django에서 전달받은 위도
let lon = longitude; // Django에서 전달받은 경도

// 마커를 생성합니다
let markerPosition = new kakao.maps.LatLng(lat, lon);

// 지도 생성
let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
let map = new kakao.maps.Map(mapContainer, mapOption);

// 마커를 생성하고 지도에 표시합니다
let marker = new kakao.maps.Marker({
    position: markerPosition
});
marker.setMap(map);

//textarea 높이 조절, 글자 수 카운트해서 표시하기
$('#comment-area').on('input', function() {
    //높이 조절(내부 콘텐츠 만큼 height가 늘어나도록)
    $(this).css('height', 'auto');
    $(this).css('height', $(this)[0].scrollHeight + 'px');

    //글자 수 카운트
    let textLength = $(this).val().length;
    $('#text-count').text(textLength + ' / 500');

    if (textLength > 500) { //글자 수 150을 초과하지 않도록 설정 (maxlength는 한 글자가 초과되는 것이 발생)
        $(this).value =  $(this).slice(0, 500);
    }
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