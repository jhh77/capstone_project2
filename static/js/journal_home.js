//1️⃣달력 코드-------------------------------------------------------------------------
let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화


// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
    // console.log(`Building calendar for: ${nowMonth}`); // 달력 생성 날짜 출력

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신
    // document.getElementById("change").innerText = leftPad(nowMonth.getMonth() + 1)+"월 "+nowMonth.getFullYear(); //몇월 몇년 타이틀 부분 추가

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복
        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }

        if (nowDay < today) {                       // 지난날인 경우
            // newDIV.className = "pastDay";
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
            choiceDate(newDIV);
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }

    }
}

// 날짜 선택
function choiceDate(newDIV) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가

    const selectedDate = $(newDIV).text(); // 선택한 날짜
    const year = $('#calYear').text();
    const month = $('#calMonth').text();

    // 해당 날짜의 순찰 일지 ajax로 요청학히
    $.ajax({
        url: '/journals/get-journal/',
        method: 'GET',
        data: {
            date : `${year}-${month}-${selectedDate}`
        },
        success: function(response) {
            // 서버에서 받은 데이터 처리
            express_journals(response) // 일지 데이터 출력
            // 여기에 일지를 페이지에 표시하는 코드를 추가하세요
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString); // 문자열을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0'); // 일자

    return `${year}년 ${month}월 ${day}일`; // 원하는 형식으로 반환
}

function express_journals(journalData) {
    const journalContainer = $('.journals-block'); // 일지를 표시할 컨테이너

    journalContainer.empty(); // 기존 내용 초기화

    if (journalData.length === 0) {
        // 일지가 없는 경우
        const noJournalElement = $(`
            <div class="no-board-block">
                <img src="../../static/image/no_board.png" alt="" class="no-board-img"/>
                <p>일지가 없습니다.</p>
                <p>일지를 작성해 보세요!</p>
            </div>
        `);
        journalContainer.append(noJournalElement);
    } else {
        // 일지가 있는 경우
        $.each(journalData, function(index, journal) {
            let date = formatDate(journal.date);
            const journalElement = $(`
                <div class="journal-block">
                    <a href="${journalDetailUrl.replace('0', journal.id)}">
                        <div class="date-block">
                            <div class="date">${date}</div>
                            <div class="time">${journal.start_time} ~ ${journal.end_time}</div>
                        </div>
                        <div class="journal-title">반려견 순찰대 일지</div>
                    </a>
                </div>
            `);
            journalContainer.append(journalElement);
        });
    }
}


// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}

buildCalendar();


//달력 코드 끝-------------------------------------------------------------------------

$(document).ready(function() {
    //반려견 순찰대 일지 삭제 모달 코드
    const modal = $('#modal'); //모달 변수에 저장

    // .delete 클래스가 있는 요소에 대한 클릭 이벤트를 문서에 바인딩
    $(document).on('click', '.delete', function() {
        modal.slideDown(); // 모달 열기
    });

    $('.closePopup').on('click', function() { // 아니오를 누르면 모달창이 사라지기
        modal.slideUp();
    });

    $('.btn-close').on('click', function() { // X를 누르면 모달창이 사라지기
        modal.slideUp();
    });
})