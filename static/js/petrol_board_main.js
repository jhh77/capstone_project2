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
    jQuery('.region-block').on('submit', function (event) {
        let sido = jQuery('#sido-input').val();
        let sigugun = jQuery('#sigugun-input').val();
        let dong = jQuery('#dong-input').val();

        // alert(sido + sigugun + dong);

        // 유효성 검사
        if (!sido || !sigugun || !dong) {
            event.preventDefault(); // 폼 제출 방지
            jQuery('#error-message').show(); // 에러 메시지 표시
        } else {
            jQuery('#error-message').hide(); // 에러 메시지 숨김
        }
    });

});
