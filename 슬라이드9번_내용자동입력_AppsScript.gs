/**
 * 구글 슬라이드 9번(6교시 영어 송지은 선생님)에 과정안 내용을 자동으로 채워 넣는 스크립트
 * 
 * [사용 방법]
 * 1. 구글 슬라이드 열기 (https://docs.google.com/presentation/d/1IR-BTZCYyhxH32vfEI7ogHkk7HoYfo5MBYHqpJoptFU/edit)
 * 2. 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 3. 코드 창에 이 내용을 붙여넣기 후 상단 저장(Ctrl+S)
 * 4. 상단 함수 선택에서 'fillSlide9English' 선택 후 [실행] 클릭 -> 권한 허용
 * 5. 슬라이드 9번에 표 내용이 자동으로 꽉 채워집니다!
 */
function fillSlide9English() {
  const pres = SlidesApp.getActivePresentation();
  const slides = pres.getSlides();
  // 9번 슬라이드 (0-index이므로 8번째)
  const slide9 = slides[8];

  const tables = [];
  slide9.getPageElements().forEach(el => {
    if (el.getPageElementType() === SlidesApp.PageElementType.TABLE) {
      tables.push(el.asTable());
    }
  });

  if (tables.length < 3) {
    Logger.log('오류: 슬라이드 9번에서 표를 3개 찾지 못했습니다. 표 개수: ' + tables.length);
    return;
  }

  // 1번째 표: 수업 설계 개요 (5행 2열)
  const t1 = tables[0];
  const t1Data = [
    "Self Detective: Discover the Real Me! (진로 연계 자기탐색 프로젝트)",
    "[9영03-04] 일상생활이나 친숙한 일반적 주제에 관해 자신의 의견이나 감정을 쓸 수 있다. (관심·강점 탐색 및 영어 프로필 작성으로 재구성)",
    "자신의 관심과 강점은 실제 경험이라는 단서에서 출발하며, 타인과의 상호작용 및 AI 도구의 피드백을 주체적·비판적으로 활용할 때 나를 더 깊이 이해하고 영어로 표현할 수 있다.",
    "• What am I interested in? (나는 무엇에 관심이 있는가?)\n• What am I good at? (나는 무엇을 잘하는가?)",
    "AI나 유형 테스트 결과에 의존하기보다 학생이 먼저 자신의 실제 경험을 탐색하도록 설계하였다. 이후 웹앱 테스트와 모둠 추리 게임으로 관점을 확장하고, AI 에이전트의 피드백을 선택적으로 반영하여 영어로 'About Me Profile'을 완성함으로써 학습자의 주도성을 높이고자 한다."
  ];

  for (let r = 0; r < Math.min(t1.getNumRows(), t1Data.length); r++) {
    const cell = t1.getCell(r, 1);
    cell.getText().setText(t1Data[r]);
    cell.getText().getTextStyle().setFontFamily('Noto Sans KR');
    cell.getText().getTextStyle().setFontSize(9.5);
    cell.getText().getTextStyle().setForegroundColor('#1A1C1B');
  }

  // 2번째 표: 과정별 활동 (4행 3열: 도입, 전개, 정리)
  const t2 = tables[1];
  const t2Data = [
    {
      act: "• [탐구질문 도출] Is It Really True? (4분)\n  - 관심(Student A)과 강점(Student B)이 다른 두 사례를 비교하며 구체적 경험·근거의 필요성 인식 및 탐구질문 도출\n• [초기 생각] My First Guess (2분)\n  - 테스트·AI 도움 없이 내가 생각하는 나의 관심·강점 첫 예상 기록",
      tool: "• 화면(사례 제시), 종이학습지(1쪽)\n• 관심과 강점이 반드시 일치하지 않음을 스스로 발견하도록 발문"
    },
    {
      act: "• [활동 1] Self Detective & Hidden Type Test (12분)\n  - 4가지 단서 질문(I choose / enjoy / can do / keep trying)으로 실제 경험 탐색 및 Me Map·근거 작성\n  - 영어 10문항 웹앱 테스트로 관심·강점 유형(Creator, Explorer, Connector, Planner) 확인 및 첫 생각과 비교\n• [활동 2] 모둠 추리 게임: Two Truths & One Bluff! (10분)\n  - 진짜 진술 2개·가짜 진술 1개를 만들고, 모둠원과 영어 질문(Why?, How often? 등)을 주고받으며 진짜 경험 추리\n  - [One More Clue] 테스트·게임으로 새롭게 발견한 관심·강점·근거 추가 기록\n• [활동 3] About Me Profile 작성 (7분)\n  - 탐구 결과를 종합하여 관심(Interests), 강점(Strengths), 새로운 단서(One More Clue) 3개 영역의 영어 프로필 작성",
      tool: "• 종이학습지(1~2쪽), 유형 테스트 웹앱, 추리 게임 카드\n• 초기 탐색 시 한국어 기록도 허용하여 실제 경험 탐색에 집중\n• 대본 읽기가 아닌 실제 궁금한 점을 질문하며 친구의 경험과 근거에 주목하도록 유도"
    },
    {
      act: "• [활동 4] AI Challenge: 에이전트와 점검하기 (7분)\n  - AI 에이전트와 대화하며 근거의 충분성 점검(Mission 1) 및 영어 표현 피드백 요청(Mission 2)\n• [성찰] 최종 보완 및 My AI Reflection (3분)\n  - AI 제안 중 나의 실제 경험과 의도에 맞는 내용만 다른 색 펜으로 선택 반영 후, AI 활용의 유용성과 한계 성찰",
      tool: "• 기존 AI 에이전트, 종이학습지(2쪽), 다른 색 펜\n• AI가 결과를 대신 결정·작성하지 않고 학생 스스로 최종 판단을 내리도록 지도"
    }
  ];

  for (let r = 1; r < Math.min(t2.getNumRows(), t2Data.length + 1); r++) {
    const item = t2Data[r - 1];
    const cellAct = t2.getCell(r, 1);
    cellAct.getText().setText(item.act);
    cellAct.getText().getTextStyle().setFontFamily('Noto Sans KR');
    cellAct.getText().getTextStyle().setFontSize(9);
    cellAct.getText().getTextStyle().setForegroundColor('#1A1C1B');

    const cellTool = t2.getCell(r, 2);
    cellTool.getText().setText(item.tool);
    cellTool.getText().getTextStyle().setFontFamily('Noto Sans KR');
    cellTool.getText().getTextStyle().setFontSize(9);
    cellTool.getText().getTextStyle().setForegroundColor('#1A1C1B');
  }

  // 3번째 표: 참관 포인트 & 나눔 질문 (2행 2열)
  const t3 = tables[2];
  const t3Data = [
    "• 웹앱 테스트나 AI 결과에 끌려가지 않고, 자신의 실제 경험에서 관심·강점의 근거를 찾아내는가?\n• 모둠 추리 게임(Two Truths & One Bluff)에서 친구의 진술에 대해 질문을 주고받으며 새로운 단서를 발견하는가?\n• AI 에이전트의 피드백을 무비판적으로 수용하지 않고, 자신의 의도와 실제 경험에 비추어 선택적으로 반영하는가?",
    "• 자기이해 및 영어 표현 활동에서 '개인 경험 탐색 → 동료 상호작용 → AI 피드백'으로 이어지는 탐구 흐름이 학생 주도성을 살리는 데 효과적이었나요?\n• 학생들의 영어 수준 차이를 고려할 때, 모둠 추리 게임과 AI 에이전트 활용 단계에서 참여를 더 촉진할 수 있는 지원 방안은 무엇일까요?"
  ];

  for (let r = 0; r < Math.min(t3.getNumRows(), t3Data.length); r++) {
    const cell = t3.getCell(r, 1);
    cell.getText().setText(t3Data[r]);
    cell.getText().getTextStyle().setFontFamily('Noto Sans KR');
    cell.getText().getTextStyle().setFontSize(9);
    cell.getText().getTextStyle().setForegroundColor('#1A1C1B');
  }

  Logger.log('성공: 9번 슬라이드(영어 송지은 선생님)에 모든 내용이 입력되었습니다!');
}
