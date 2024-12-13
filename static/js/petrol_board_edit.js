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

// 파일 업로드 관련
$('#fileInput').on('change', function(event) {
    const files = event.target.files; // 선택된 파일들
    const messageBlock = $('.src-name');
    messageBlock.empty(); // 이전 내용을 초기화
    let check = $('#img-delete');

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

});


// "사진 삭제" 스팬 클릭 시 파일 입력 초기화
$('#clearImage').on('click', function () {
    // 파일 입력 초기화
    $('#fileInput').val('');

    // 파일 이름 표시 초기화
    $('.src-name').empty(); // 파일 이름 숨기기

    // 체크박스 값 설정
    $('#img-delete').val(1);
});