jQuery(document).ready(function () {
    // 시도 옵션 추가
    jQuery.each(hangjungdong.sido, function (idx, code) {
        jQuery('#sido-select .select-items').append(fn_option(code.sido, code.codeNm));
    });

    // 기본 선택 옵션 추가
    jQuery('#sigugun-select .select-items').append(fn_option('', '시/구/군 선택'));
    jQuery('#dong-select .select-items').append(fn_option('', '읍/면/동 선택'));


    // 시도 선택 시 시군구 옵션 추가
    jQuery('#sido-select .select-selected').click(function () {
        jQuery('#sido-select .select-items').toggle();
        jQuery('#sigugun-select .select-items').hide(); // 시군구 옵션 닫기
        jQuery('#dong-select .select-items').hide(); // 동 옵션 닫기
    });

    jQuery('#sido-select .select-items').on('click', 'div', function () {
        let selectedText = jQuery(this).text();
        let selectedValue = jQuery(this).data('value');
        jQuery('#sido-select .select-selected').text(selectedText).data('value', selectedValue);
        jQuery('#sido-select .select-items').hide();

        // 글자 색 변경
        jQuery('#sido-select .select-selected').addClass('selected');

        // 시군구 및 동 초기화
        jQuery('#sigugun-select .select-selected').text('시/구/군 선택').removeClass('selected');
        jQuery('#dong-select .select-selected').text('읍/면/동 선택').removeClass('selected');
        jQuery('#sigugun-input').val(''); // hidden input 초기화
        jQuery('#dong-input').val(''); // hidden input 초기화

        // 시군구 옵션 업데이트
        updateSigugunOptions(selectedValue);
        jQuery('#sigugun-select .select-items').show(); // 시군구 옵션 보이기

        // 지역 이름 hidden input에 설정
        jQuery('#sido-input').val(selectedText); // 지역 이름 설정
    });

    // 시군구 선택 시 동 초기화
    jQuery('#sigugun-select .select-selected').click(function () {
        jQuery('#sigugun-select .select-items').toggle();
        jQuery('#dong-select .select-items').hide(); // 동 옵션 닫기
    });

    jQuery('#sigugun-select .select-items').on('click', 'div', function () {
        let selectedText = jQuery(this).text();
        let selectedValue = jQuery(this).data('value');
        jQuery('#sigugun-select .select-selected').text(selectedText).data('value', selectedValue);
        jQuery('#sigugun-select .select-items').hide();

        // 글자 색 변경
        jQuery('#sigugun-select .select-selected').addClass('selected');

        // 동 초기화
        jQuery('#dong-select .select-selected').text('읍/면/동 선택').removeClass('selected');
        jQuery('#dong-input').val(''); // hidden input 초기화

        // 동 옵션 업데이트
        updateDongOptions(selectedValue);
        jQuery('#dong-select .select-items').show(); // 동 옵션 보이기

        // 지역 이름 hidden input에 설정
        jQuery('#sigugun-input').val(selectedText); // 지역 이름 설정
    });

    // 동 선택 시 선택된 값 hidden input에 설정
    jQuery('#dong-select .select-selected').click(function () {
        jQuery('#dong-select .select-items').toggle();
    });

    jQuery('#dong-select .select-items').on('click', 'div', function () {
        let selectedText = jQuery(this).text();
        let selectedValue = jQuery(this).data('value');
        jQuery('#dong-select .select-selected').text(selectedText).data('value', selectedValue);
        jQuery('#dong-select .select-items').hide();

        // 글자 색 변경
        jQuery('#dong-select .select-selected').addClass('selected');

        // 선택된 값을 hidden input에 설정
        // '시군구 선택'이나 '읍면동 선택'일 경우 값 설정 안 함
        console.log(selectedValue);
        if (selectedValue !== '') {
            jQuery('#sido-input').val(jQuery('#sido-select .select-selected').text());
            jQuery('#sigugun-input').val(jQuery('#sigugun-select .select-selected').text());
            jQuery('#dong-input').val(selectedText);
        }
    });

    function updateSigugunOptions(sidoCode) {
        jQuery('#sigugun-select .select-items').empty(); // 기존 옵션 제거
        jQuery.each(hangjungdong.sigugun, function (idx, code) {
            if (sidoCode == code.sido) {
                jQuery('#sigugun-select .select-items').append(fn_option(code.sigugun, code.codeNm));
            }
        });

        // 기본 선택 옵션 추가
        jQuery('#sigugun-select .select-items').prepend(fn_option('', '시/구/군 선택'));

        // 테두리 설정
        toggleBorder('#sigugun-select');
    }

    function updateDongOptions(sigugunCode) {
        jQuery('#dong-select .select-items').empty(); // 기존 옵션 제거
        let sidoCode = jQuery('#sido-select .select-selected').data('value');

        jQuery.each(hangjungdong.dong, function (idx, code) {
            if (sidoCode == code.sido && sigugunCode == code.sigugun) {
                jQuery('#dong-select .select-items').append(fn_option(code.dong, code.codeNm));
            }
        });

        // 기본 선택 옵션 추가
        jQuery('#dong-select .select-items').prepend(fn_option('', '읍/면/동 선택'));

        // 테두리 설정
        toggleBorder('#dong-select');
    }

    function fn_option(code, name) {
        return '<div data-value="' + code + '">' + name + '</div>';
    }

    // 지역 선택 안했을 시 폼 제출 막기
    jQuery('.signup-form').on('submit', function (event) {
        let sido = jQuery('#sido-input').val();
        let sigugun = jQuery('#sigugun-input').val();
        let dong = jQuery('#dong-input').val();

        // 유효성 검사
        if (!sido || !sigugun || !dong) {
            event.preventDefault(); // 폼 제출 방지
            jQuery('#error-message').show(); // 에러 메시지 표시
        } else {
            jQuery('#error-message').hide(); // 에러 메시지 숨김
        }
    });

});



//비밀번호 보이게 하는 기능
// attr() 메서드는 요소의 속성을 가져오거나 설정
$('#passwd-icon1').click(function() {
    const fieldType = $('#password1').attr('type');
    const passwordField = $('#password1');

    if (fieldType === 'password') {
        passwordField.attr('type', 'text'); // 텍스트로 변경하여 비밀번호가 가려지지 않게 함
        $('#passwd-icon1 img').attr('src', '../../static/image/eye-open.png'); // 이미지 경로 변경하여 아이콘 변경
    } else {
        passwordField.attr('type', 'password'); // 비밀번호 입력 필드의 타입을 다시 password로 변경하여 비밀번호를 가리게 함
        $('#passwd-icon1 img').attr('src', '../../static/image/eye-close.png'); // 이미지 경로 변경하여 아이콘 변경
    }
});

//비밀번호 보이게 하는 기능
// attr() 메서드는 요소의 속성을 가져오거나 설정
$('#passwd-icon2').click(function() {
    const fieldType = $('#password2').attr('type');
    const passwordField = $('#password2');

    if (fieldType === 'password') {
        passwordField.attr('type', 'text'); // 텍스트로 변경하여 비밀번호가 가려지지 않게 함
        $('#passwd-icon2 img').attr('src', '../../static/image/eye-open.png'); // 이미지 경로 변경하여 아이콘 변경
    } else {
        passwordField.attr('type', 'password'); // 비밀번호 입력 필드의 타입을 다시 password로 변경하여 비밀번호를 가리게 함
        $('#passwd-icon2 img').attr('src', '../../static/image/eye-close.png'); // 이미지 경로 변경하여 아이콘 변경
    }
});

//아이디 중복검사 서버에 요청하기
$('#idCheckBtn').click(function () {
    $('.id-error').text('');
    let userId = $('#user_id').val(); //아이디 값 가져오기
    let regex = /^[a-zA-Z0-9]+$/;

    //아무것도 입력 안했을 때
    if (userId.trim() === '') {
        $('#idCheckResponse').text("아이디를 입력해 주세요.");
        $('#idCheckResponse').css('color', '#E07070');
        return;
    }

    //아이디를 한글 넣었을 때
    if (!regex.test(userId)) {
        $('#idCheckResponse').text('아이디는 영문자와 숫자만 가능합니다.');
        $('#idCheckResponse').css('color', '#E07070');
        return;
    }

    if (userId) { //값이 있으면
        $.ajax({ //서버로 요청
            url: '/accounts/id-check/',
            type: 'POST',
            data: {
                'user_id': userId, //아이디값 주기
                'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val() //보안을 위해
            },
            success: function (data) {
                if (data.is_taken) {
                    $('#idCheckSuccess').val("false"); // 중복 검사 실패
                    $('#idCheckResponse').text('이미 등록된 아이디입니다.');
                    $('#idCheckResponse').css('color', '#E07070');
                    $('#user_id').focus()

                } else {
                    $('#idCheckSuccess').val("true"); // 중복 검사 성공
                    $('#idCheckResponse').text('사용 가능한 아이디입니다.');
                    $('#idCheckResponse').css('color', '#5D6DBE');
                }
            }
        });
    } else {
        $('#idCheckResponse').text("아이디를 입력해 주세요.");
        $('#idCheckResponse').css('color', '#E07070');
    }
});

// 폼 제출 시, 중복 검사가 성공적으로 이뤄졌는지, 비밃번호가 맞는 지 확인
$('.submit-btn').click(function (e) {
    // alert($('#sido-input').val() + $('#sigugun-input').val() + $('#dong-input').val());
    $('.id-error').text('');
    let passwd1 = $('#password1').val()
    let passwd2 = $('#password2').val()
    alert(passwd1 + passwd2)

    const isIdChecked = $('#idCheckSuccess').val();
    if (isIdChecked !== "true") {
        $('#idCheckResponse').text("아이디 확인 후 중복 검사를 해주세요.");
        $('#idCheckResponse').css('color', '#E07070');
        return false; // 폼 제출 방지
    }
    else if (passwd1 !== passwd2) {
        $('.passwd-error').text('비밀번호가 다릅니다.')
        $('.passwd-error').css('color', '#E07070');
        return false; // 폼 제출 방지
    }
    else {
        $('#idCheckResponse').text('');
        $('.passwd-error').text('');
    }
});