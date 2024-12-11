//페이지 로딩 시 textarea에 focus 주기 + 원래 컨텐츠 길이 표시하기
$(document).ready(function() {
    const write = $('#write-text');
    write.focus();
    const textLength = write.val().length;
    console.log(textLength);
    $('#text-count').text(textLength + ' / 1000');

    //높이 조절(내부 콘텐츠 만큼 height가 늘어나도록)
    $('#write-text').css('height', 'auto');
    $('#write-text').css('height', $('#write-text')[0].scrollHeight + 'px');
});

//textarea 높이 조절, 글자 수 카운트해서 표시하기
$('#write-text').on('input', function() {
    //높이 조절(내부 콘텐츠 만큼 height가 늘어나도록)
    $(this).css('height', 'auto');
    $(this).css('height', $(this)[0].scrollHeight + 'px');

    //글자 수 카운트
    let textLength = $(this).val().length;
    $('#text-count').text(textLength + ' / 1000');

    if (textLength > 150) { //글자 수 150을 초과하지 않도록 설정 (maxlength는 한 글자가 초과되는 것이 발생)
        $(this).value =  $(this).slice(0, 1000);
    }
});

// 파일 업로드 관련
$('#fileInput').on('change', function(event) {
    const files = event.target.files; // 선택된 파일들
    const messageBlock = $('.src-name');
    messageBlock.empty(); // 이전 내용을 초기화

    // 선택된 파일이 1개일 경우만 처리
    if (files.length === 0) {
        return; // 파일이 선택되지 않은 경우
    }

    const file = files[0]; // 첫 번째 파일만 가져오기
    const fileName = file.name;
    const extension = fileName.split('.').pop(); // 확장자 추출
    const baseName = fileName.substring(0, fileName.length - extension.length - 1); // 확장자를 제외한 이름

    // 파일 이름이 10자 이상인 경우 처리
    const displayName = baseName.length > 10 ? baseName.substring(0, 10) + '...' + '.' + extension : fileName;

    const fileItem = $('<div></div>').text(displayName).addClass('file-item');
    fileItem.attr('data-index', 0); // 인덱스를 0으로 설정 (하나만 선택하므로)
    messageBlock.append(fileItem);
});

// "사진 삭제" 스팬 클릭 시 파일 입력 초기화
$('#clearImage').on('click', function () {
    // 파일 입력 초기화
    $('#fileInput').val('');

    // 파일 이름 표시 초기화
    $('.src-name').empty(); // 파일 이름 숨기기
});

// 파일 이름 클릭 시 삭제 기능
// $('.src-name').on('click', '.file-item', function() {
//     // 파일 초기화
//     $('#fileInput').val(''); // 선택된 파일 초기화
//     $(this).remove(); // 삭제된 파일의 이름 제거
// });

// $('.journal-form').on('submit', function (event) {
//     event.preventDefault();
//     const selectValue = $('input[name="post-type"]:checked').val();
//
//     if (selectValue === '제보') {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 const lat = position.coords.latitude;
//                 const lon = position.coords.longitude;
//
//                 // 위치 정보가 설정된 후에 alert 실행
//                 alert('폼 막아놓음.\n' + '위도: ' + lat + ', 경도: ' + lon);
//
//                 // 위도와 경도를 hidden input에 설정
//                 $('#lat').val(lat);
//                 $('#lon').val(lon);
//             });
//         } else {
//             alert('현재 위치 정보를 가져오는데 실패했습니다.');
//         }
//     }
//     else {
//         alert('폼 막아놓음');
//     }
// });