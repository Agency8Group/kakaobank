// Tailwind CSS와 연동된 고급 입금 메시지 시스템
class AdvancedIncomeMessageSystem {
    constructor() {
        this.messages = document.querySelectorAll('.income-message');
        this.currentIndex = 0;
        this.interval = null;
        this.depositCount = 0;
        this.depositCountElement = document.getElementById('deposit-count');
        
        // 다양한 입금 금액 배열 (더 많은 변수)
        this.depositAmounts = [
            '₩5,000,000', '₩12,000,000', '₩3,800,000',
            '₩8,500,000', '₩15,200,000', '₩7,300,000',
            '₩22,000,000', '₩4,700,000', '₩18,900,000',
            '₩6,400,000', '₩25,000,000', '₩9,100,000',
            '₩13,500,000', '₩3,200,000', '₩19,800,000',
            '₩11,700,000', '₩7,600,000', '₩16,300,000',
            '₩4,900,000', '₩21,400,000', '₩8,800,000',
            '₩14,200,000', '₩5,500,000', '₩17,600,000'
        ];
        
        this.init();
    }

    init() {
        // 첫 번째 메시지를 활성화
        this.showMessage(0);
        
        // 더 빠른 속도로 메시지 변경 (1.5초마다)
        this.startRotation();
        
        // 입금 카운터 업데이트
        this.updateDepositCounter();
    }

    showMessage(index) {
        // 모든 메시지에서 opacity-100 클래스 제거하고 opacity-0 추가
        this.messages.forEach(message => {
            message.classList.remove('opacity-100');
            message.classList.add('opacity-0');
        });

        // 선택된 메시지에 opacity-100 클래스 추가하고 opacity-0 제거
        if (this.messages[index]) {
            this.messages[index].classList.remove('opacity-0');
            this.messages[index].classList.add('opacity-100');
            
            // 랜덤 금액으로 업데이트
            this.updateRandomAmount(this.messages[index]);
        }
    }

    updateRandomAmount(messageElement) {
        const amountElement = messageElement.querySelector('.text-kakao-yellow');
        if (amountElement) {
            const randomAmount = this.depositAmounts[Math.floor(Math.random() * this.depositAmounts.length)];
            amountElement.textContent = randomAmount;
        }
    }

    nextMessage() {
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        this.showMessage(this.currentIndex);
        
        // 입금 카운터 증가
        this.depositCount++;
        this.updateDepositCounter();
    }

    updateDepositCounter() {
        if (this.depositCountElement) {
            this.depositCountElement.textContent = this.depositCount;
        }
    }

    startRotation() {
        this.interval = setInterval(() => {
            this.nextMessage();
        }, 1500); // 1.5초마다 변경 (더 빠르게!)
    }

    stopRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // 더 빠른 모드로 전환
    enableTurboMode() {
        this.stopRotation();
        this.interval = setInterval(() => {
            this.nextMessage();
        }, 800); // 0.8초마다 변경 (터보 모드!)
    }

    // 일반 모드로 전환
    enableNormalMode() {
        this.stopRotation();
        this.interval = setInterval(() => {
            this.nextMessage();
        }, 1500); // 1.5초마다 변경
    }
}

// 실시간 잔액 업데이트 시스템
class BalanceUpdater {
    constructor() {
        // 초기 잔액 변수들 (6가지)
        this.initialBalances = [
            2120000000, // 21억 2천만원
            1850000000, // 18억 5천만원
            2340000000, // 23억 4천만원
            1980000000, // 19억 8천만원
            2670000000, // 26억 7천만원
            1760000000  // 17억 6천만원
        ];
        
        // 랜덤하게 초기 잔액 선택
        this.baseBalance = this.initialBalances[Math.floor(Math.random() * this.initialBalances.length)];
        this.currentBalance = this.baseBalance;
        this.balanceElement = document.getElementById('balance-amount');
        this.balanceTextElement = document.getElementById('balance-korean');
        this.init();
    }

    init() {
        this.updateBalanceDisplay();
        this.startBalanceUpdates();
    }

    updateBalanceDisplay() {
        if (this.balanceElement) {
            this.balanceElement.textContent = `₩${this.currentBalance.toLocaleString()}`;
        }
        
        // 한글 표시도 업데이트
        if (this.balanceTextElement) {
            const koreanAmount = this.formatKoreanAmount(this.currentBalance);
            this.balanceTextElement.textContent = `(${koreanAmount})`;
        }
    }

    // 숫자를 한글로 변환하는 함수
    formatKoreanAmount(amount) {
        const units = ['', '만', '억', '조'];
        const unitValues = [1, 10000, 100000000, 1000000000000];
        
        let result = '';
        let remaining = amount;
        
        for (let i = unitValues.length - 1; i >= 0; i--) {
            if (remaining >= unitValues[i]) {
                const value = Math.floor(remaining / unitValues[i]);
                if (value > 0) {
                    result += value + units[i];
                    remaining -= value * unitValues[i];
                }
            }
        }
        
        return result + ' 원';
    }

    startBalanceUpdates() {
        // 3초마다 잔액을 약간씩 증가
        setInterval(() => {
            const randomIncrease = Math.floor(Math.random() * 1000000) + 500000; // 50만~150만원 증가
            this.currentBalance += randomIncrease;
            this.updateBalanceDisplay();
        }, 3000);
    }
}

// 카톡 메시지 시스템
class KakaoMessageSystem {
    constructor() {
        this.messagesContainer = document.getElementById('kakao-messages');
        this.messageQueue = [];
        this.isDisplaying = false;
        this.maxMessages = 3; // 최대 3개 메시지 동시 표시
        this.activeMessages = []; // 현재 활성화된 메시지들
        
        // 직원 이름들 (더 많이 추가)
        this.employeeNames = [
            '김민수', '이지은', '박준호', '최수진', '정현우',
            '한소영', '강태현', '윤서연', '임동혁', '조미래',
            '송지훈', '배수정', '오현석', '신예린', '권도현',
            '홍지민', '서준영', '문소희', '안태민', '노하늘',
            '전민호', '유서아', '남궁진', '도예진', '구본우',
            '라미영', '마동훈', '백서현', '사미정', '아준호'
        ];
        
        // 프로젝트/고객사 이름들 (현실적인 표현)
        this.projectNames = [
            'A사 자동화 프로젝트', 'B사 ERP 시스템', 'C사 웹사이트 구축', 'D사 데이터 분석', 'E사 고객센터',
            'F사 주문관리 시스템', 'G사 재고관리', 'H사 예약시스템', 'I사 설문조사', 'J사 뉴스수집',
            'K사 스케줄러', 'L사 대시보드', 'M사 API 연동', 'N사 AI 챗봇', 'O사 모바일앱',
            'P사 결제시스템', 'Q사 회원관리', 'R사 상품관리', 'S사 배송추적', 'T사 통계분석',
            'U사 이메일 자동화', 'V사 파일처리', 'W사 실시간 모니터링', 'X사 백업시스템', 'Y사 보안강화'
        ];
        
        // 메시지 템플릿들 (현실적이고 뇌해킹하는 메시지들)
        this.messageTemplates = [
            {
                type: 'project_updates',
                messages: [
                    '대표님, {project} 완료되었습니다!',
                    '대표님, {project} 고객이 만족해하시네요',
                    '대표님, {project} 추가 요청 들어왔어요',
                    '대표님, {project} 성과가 정말 좋습니다',
                    '대표님, {project} 다음 단계 진행할까요?',
                    '대표님, {project} 고객이 또 다른 프로젝트 문의했어요',
                    '대표님, {project} 덕분에 고객사 업무 효율 90% 향상됐대요'
                ]
            },
            {
                type: 'business_success',
                messages: [
                    '대표님, 오늘도 프로젝트 수주 성공!',
                    '대표님, 또 새로운 고객사 계약 체결됐어요',
                    '대표님, 월 구독료 정산 완료했습니다',
                    '대표님, 고객 만족도 조사 결과 97%예요',
                    '대표님, 업무 자동화로 고객사 시간 87% 절약됐어요',
                    '대표님, AI 솔루션 성과가 대박이에요',
                    '대표님, 프리랜서라고 하지만 실제로는 CEO잖아요'
                ]
            },
            {
                type: 'team_communication',
                messages: [
                    '대표님, 팀원들이 대표님 기다리고 있어요',
                    '대표님, 오늘도 수고하셨어요!',
                    '대표님, 커피 한 잔 하세요',
                    '대표님, 점심 맛있게 드셨어요?',
                    '대표님, 주말에도 프로젝트 하시나요?',
                    '대표님, 고객사에서 대표님 만나고 싶어해요',
                    '대표님, 어디 가든 대표님 맞잖아요'
                ]
            },
            {
                type: 'technical_updates',
                messages: [
                    '대표님, Python 자동화 스크립트 완성됐어요',
                    '대표님, 웹 대시보드 업데이트 완료',
                    '대표님, AI API 연동 성공했습니다',
                    '대표님, 데이터 분석 결과 나왔어요',
                    '대표님, 시스템 최적화 작업 완료',
                    '대표님, 보안 강화 업데이트 적용됐어요',
                    '대표님, 24시간 자동화 시스템 가동 중입니다'
                ]
            },
            {
                type: 'client_feedback',
                messages: [
                    '대표님, 고객사에서 정말 만족해하시네요',
                    '대표님, 업무 효율이 엄청나게 좋아졌대요',
                    '대표님, 다른 부서에서도 문의 들어왔어요',
                    '대표님, 고객사 임원진이 대표님 만나고 싶어해요',
                    '대표님, 성과 보고서에 대표님 솔루션 언급됐어요',
                    '대표님, 경쟁사 대비 압도적 성능이래요',
                    '대표님, 고객사에서 연봉 인상 요청했어요 ㅋㅋ'
                ]
            }
        ];
        
        this.init();
    }

    init() {
        // 3초 후부터 메시지 시작 (더 빠르게)
        setTimeout(() => {
            this.startMessageSystem();
        }, 3000);
    }

    startMessageSystem() {
        // 3-6초마다 새로운 메시지 생성 (더 자주)
        setInterval(() => {
            this.generateMessage();
        }, 3000 + Math.random() * 3000);
    }

    generateMessage() {
        const template = this.messageTemplates[Math.floor(Math.random() * this.messageTemplates.length)];
        const messageText = template.messages[Math.floor(Math.random() * template.messages.length)];
        const employeeName = this.employeeNames[Math.floor(Math.random() * this.employeeNames.length)];
        const projectName = this.projectNames[Math.floor(Math.random() * this.projectNames.length)];
        
        // 템플릿 변수 치환
        const finalMessage = messageText.replace('{project}', projectName);
        
        // 최대 3개까지만 표시하고, 초과시 가장 오래된 메시지 제거
        if (this.activeMessages.length >= this.maxMessages) {
            this.removeOldestMessage();
        }
        
        this.showMessage(employeeName, finalMessage, template.type);
    }

    showMessage(senderName, message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = 'kakao-message mb-2 max-w-xs mx-auto';
        
        // 메시지 타입에 따른 색상 (조화로운 색상 팔레트)
        let bgColor = 'bg-blue-600';
        if (type === 'project_updates') {
            bgColor = 'bg-blue-600';
        } else if (type === 'business_success') {
            bgColor = 'bg-emerald-600';
        } else if (type === 'team_communication') {
            bgColor = 'bg-slate-600';
        } else if (type === 'technical_updates') {
            bgColor = 'bg-indigo-600';
        } else if (type === 'client_feedback') {
            bgColor = 'bg-amber-600';
        }
        
        messageElement.innerHTML = `
            <div class="flex items-end space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md">
                    ${senderName.charAt(0)}
                </div>
                <div class="flex flex-col">
                    <div class="text-xs text-gray-300 mb-1 font-medium">${senderName}</div>
                    <div class="${bgColor} text-white px-4 py-3 rounded-2xl rounded-bl-md text-sm break-keep shadow-lg">
                        ${message}
                    </div>
                </div>
            </div>
        `;
        
        // 메시지가 위에서 아래로 내려오는 애니메이션 (잔액 위에 누적)
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-50px) scale(0.8)';
        messageElement.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        this.messagesContainer.appendChild(messageElement);
        
        // 위에서 아래로 내려오는 애니메이션
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0) scale(1)';
        }, 50);
        
        // 활성 메시지 목록에 추가
        this.activeMessages.push({
            element: messageElement,
            timestamp: Date.now()
        });
        
        // 8초 후 페이드 아웃 (더 오래 머물도록)
        setTimeout(() => {
            this.removeMessage(messageElement);
        }, 8000);
    }
    
    removeMessage(messageElement) {
        // 페이드 아웃 애니메이션 (위로 올라가며 사라짐)
        messageElement.style.transition = 'all 0.3s ease-out';
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-30px) scale(0.9)';
        
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
            
            // 활성 메시지 목록에서 제거
            this.activeMessages = this.activeMessages.filter(msg => msg.element !== messageElement);
        }, 300);
    }
    
    removeOldestMessage() {
        if (this.activeMessages.length > 0) {
            const oldestMessage = this.activeMessages[0];
            this.removeMessage(oldestMessage.element);
        }
    }
}

// 페이지 로드 시 시스템 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 고급 입금 메시지 시스템 초기화
    const messageSystem = new AdvancedIncomeMessageSystem();
    
    // 잔액 업데이트 시스템 초기화
    const balanceUpdater = new BalanceUpdater();
    
    // 카톡 메시지 시스템 초기화
    const kakaoMessageSystem = new KakaoMessageSystem();

    // 페이지 가시성 변경 시 애니메이션 제어
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            messageSystem.stopRotation();
        } else {
            messageSystem.startRotation();
        }
    });

    // 추가 배경 애니메이션 요소 생성
    createFloatingElements();

    // 터치 이벤트로 모드 전환
    let touchCount = 0;
    let lastTouchTime = 0;

    document.addEventListener('touchstart', function(e) {
        const currentTime = Date.now();
        
        if (currentTime - lastTouchTime < 500) {
            touchCount++;
        } else {
            touchCount = 1;
        }
        
        lastTouchTime = currentTime;
        
        // 3번 빠르게 터치하면 터보 모드
        if (touchCount >= 3) {
            messageSystem.enableTurboMode();
            touchCount = 0;
            
            // 10초 후 일반 모드로 복귀
            setTimeout(() => {
                messageSystem.enableNormalMode();
            }, 10000);
        }
    });

    // 키보드 이벤트 (데스크톱에서 테스트용)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            messageSystem.nextMessage();
        } else if (e.key === 't' || e.key === 'T') {
            // T키로 터보 모드 토글
            if (messageSystem.interval && messageSystem.interval._intervalId) {
                messageSystem.enableNormalMode();
            } else {
                messageSystem.enableTurboMode();
            }
        }
    });
});

// 추가 배경 애니메이션 요소 생성
function createFloatingElements() {
    const backgroundAnimation = document.querySelector('.absolute.top-0.left-0');
    
    // 더 많은 떠다니는 요소들 생성
    for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'absolute w-1 h-1 bg-kakao-yellow/60 rounded-full animate-float';
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 8 + 's';
        element.style.animationDuration = (6 + Math.random() * 8) + 's';
        
        // 랜덤 크기
        const size = 1 + Math.random() * 3;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        
        backgroundAnimation.appendChild(element);
    }
}

// 터치 이벤트로 메시지 수동 변경
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        // 위로 스와이프 시 다음 메시지로
        if (diff > 0) {
            const activeMessage = document.querySelector('.income-message.opacity-100');
            const nextMessage = activeMessage.nextElementSibling || 
                               document.querySelector('.income-message');
            
            activeMessage.classList.remove('opacity-100');
            activeMessage.classList.add('opacity-0');
            nextMessage.classList.remove('opacity-0');
            nextMessage.classList.add('opacity-100');
        }
    }
}

// 모바일에서 더 나은 터치 경험을 위한 추가 이벤트
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// 화면 회전 시 레이아웃 조정
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // 화면 회전 후 잠시 대기 후 레이아웃 재조정
        window.scrollTo(0, 0);
    }, 100);
});