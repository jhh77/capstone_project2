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

    if (textLength > 1000) { //글자 수 150을 초과하지 않도록 설정 (maxlength는 한 글자가 초과되는 것이 발생)
        $(this).value =  $(this).slice(0, 1000);
    }
});

//파일 업로드 관련
// let deletedFiles = []; // 삭제된 파일의 ID를 저장할 배열
$('#fileInput').on('change', function(event) {
    const files = event.target.files; // 선택된 파일들
    const messageBlock = $('.src-name');
    messageBlock.empty(); // 이전 내용을 초기화
    // deletedFiles = []
    let check = $('#img-delete');

    if (files.length > 4) {
        alert('최대 4개의 파일만 선택할 수 있습니다.');
        $(this).val(''); // 선택된 파일 초기화
        return;
    }

    // 선택된 파일 이름 각각에 대해 새로운 div 생성
    $.each(files, function(index, file) {
        const fileName = file.name;
        const extension = fileName.split('.').pop(); // 확장자 추출
        const baseName = fileName.substring(0, fileName.length - extension.length - 1); // 확장자를 제외한 이름

        // 파일 이름이 7자 이상인 경우 처리
        const displayName = baseName.length > 10 ? baseName.substring(0, 10) + '...' + '.' + extension : fileName;

        const fileItem = $('<div></div>').text(displayName).addClass('file-item');
        fileItem.attr('data-index', index); // 파일 인덱스를 데이터 속성에 저장
        messageBlock.append(fileItem);
    });
    check.val(1);
    alert(check.val())
});

$('#clearImage').on('click', function () {
    // 파일 입력 초기화
    $('#fileInput').val('');

    // 파일 이름 표시 초기화
    $('.src-name').empty(); // 파일 이름 숨기기

    // 체크박스 값 설정
    $('#img-delete').val(1);
});

// // 파일 이름 클릭 시 삭제 기능
// $('.src-name').on('click', '.file-item', function() {
//     const indexToRemove = $(this).data('index'); // 클릭된 파일의 인덱스
//     const currentFiles = $('#fileInput')[0].files;
//     const newFileList = Array.from(currentFiles).filter((_, index) => index !== indexToRemove); // 클릭한 파일 제외
//
//     // 새 파일 리스트를 설정
//     const dataTransfer = new DataTransfer();
//     newFileList.forEach(file => dataTransfer.items.add(file));
//     $('#fileInput')[0].files = dataTransfer.files;
//
//     // 선택된 파일 이름 업데이트
//     $(this).remove(); // 삭제된 파일의 이름 제거
// });

// 파일 이름 클릭 시 삭제 기능

// $('.src-name').on('click', '.file-item', function() {
//     const fileIdToRemove = $(this).data('id'); // 클릭된 파일의 ID
//     const currentFiles = $('#fileInput')[0].files;
//     const newFileList = Array.from(currentFiles).filter((_, index) => index !== $(this).data('index')); // 클릭한 파일 제외
//
//     // 삭제할 기존 파일의 ID를 저장
//     if (fileIdToRemove) {
//         deletedFiles.push(fileIdToRemove); // 삭제된 파일 ID를 추가
//     }
//
//     // 새 파일 리스트를 설정
//     const dataTransfer = new DataTransfer();
//     newFileList.forEach(file => dataTransfer.items.add(file));
//     $('#fileInput')[0].files = dataTransfer.files;
//
//     // 선택된 파일 이름 업데이트
//     $(this).remove(); // 삭제된 파일의 이름 제거
// });
//
// // 폼 제출 시 삭제된 파일 처리
// $('form').on('submit', function() {
//     // 삭제된 파일의 ID를 서버에 전송할 수 있도록 추가
//     $('<input>').attr({
//         type: 'hidden',
//         name: 'deleted_files',
//         value: JSON.stringify(deletedFiles) // 삭제된 파일 ID를 JSON 문자열로 변환
//     }).appendTo('form');
// });