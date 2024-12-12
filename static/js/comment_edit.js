//페이지 로딩 시 textarea에 focus 주기 + 원래 컨텐츠 길이 표시하기
$(document).ready(function() {
    const write = $('#comment-area');
    write.focus();
    const textLength = write.val().length;
    $('#text-count').text(textLength + ' / 500');

    //높이 조절(내부 콘텐츠 만큼 height가 늘어나도록)
    $('#comment-area').css('height', 'auto');
    $('#comment-area').css('height', $('#comment-area')[0].scrollHeight + 'px');
});

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