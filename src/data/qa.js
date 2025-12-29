// qa.js : 질문 → 답변 매핑
export const qaMap = {
  // 1번 : Agent를 사용하지 않는 질문
  "오늘 조선팰리스호텔 숙박 가격 알려줘.": {
    answer: [
      {
        text: "죄송하지만 저는 실시간 인터넷 검색이 불가능해서 오늘 조선팰리스호텔의 정확한 숙박 가격을 바로 알려드릴 수 없습니다.",
        delay: 650,
      },
      {
        text: "다만 참고용으로, 대략적인 가격 범위를 안내드리겠습니다.",
        delay: 520,
      },
      {
        text: "일반 객실(스탠다드): 1박에 15만~25만원 사이",
        delay: 680,
      },
      {
        text: "스위트룸: 1박에 30만~50만원 사이",
        delay: 720,
      },
      {
        text: "가격은 시즌, 예약 시점, 객실 종류, 프로모션 등에 따라 크게 달라질 수 있습니다.",
        delay: 640,
      },
      {
        text: "가장 정확한 금액은 아래 방법으로 확인하시는 것을 권장드립니다.",
        delay: 520,
      },
      {
        text: "1. 호텔 공식 홈페이지 – 예약 페이지에서 날짜와 객실을 선택하면 실시간 요금이 표시됩니다.",
        delay: 700,
      },
      {
        text: "2. 온라인 여행사(OTA) – 호텔링, 에어비앤비, 트립어드바이저 등에서 가격 비교가 가능합니다.",
        delay: 760,
      },
      {
        text: "3. 전화 문의 – 호텔 프런트에 직접 연락해 현재 요금과 할인 여부를 확인하는 방법도 있습니다.",
        delay: 740,
      },
      {
        text: "원하시면 예약 날짜/객실 타입을 알려주시면, 비교 기준(주중/주말 등)으로 확인 포인트를 정리해 드리겠습니다.",
        delay: 820,
      },
    ],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon4.png",
    activeAgentName: null,
    runDocSearch: null,
  },

  // 2번 : 생성형 1 - 이미지+마스크로 NC 결함 합성 / MicroDefectGen Agent
  "정상 베어링 이미지를 하나 보낼게. 이 이미지랑 내가 같이 보내는 결함 마스크 위치에 NC 머신에서 발생하는 결함을 가진 베어링 이미지를 생성해 줘.": {
    answer: [
      {
        text: "정상 베어링 이미지와 결함 마스크를 확인했습니다.",
        delay: 2100,
      },
      {
        text: "지정하신 마스크 위치에 NC 머신에서 발생하는 결함 패턴이 포함되도록 합성 이미지를 생성하겠습니다.",
        delay: 1200,
      },
      {
        text: "결함 이미지 생성 중입니다…",
        delay: 3000,
      },
      {
        text: "생성이 완료되었습니다. 요청하신 위치에 NC 가공 과정에서 자주 보이는 흰색 긁힘 형태의 결함이 반영되었습니다.",
        delay: 980,
      },
      {
        text: "원하시면 결함 강도(약/중/강)나 결함 유형을 바꿔서 추가 생성도 가능합니다.",
        delay: 760,
      },
    ],
    machineId: "nc_machining",
    attachments: [{ type: "video", url: "/answer_images/6f_1_video_h264.mp4" }],
    aiIcon: "/chat_icons/art_icon3.png",
    activeAgentName: "MicroDefectGen Agent",
    runDocSearch: null,
  },

  // 3번 : 생성형 2 - Laser M/C 절단 오류 결함 합성 / MicroDefectGen Agent
  "레이저 공정에서 가공하는 베어링 이미지도 하나 보낼게. 이 제품 이미지에 오른쪽 위 모서리에 레이저 공정의 절단 오류 결함을 적용한 이미지를 만들어줘.": {
    answer: [
      {
        text: "제품 이미지를 확인했습니다.",
        delay: 2200,
      },
      {
        text: "요청하신 대로 오른쪽 위 모서리 영역을 대상으로 Laser M/C 공정의 절단 오류 결함을 반영해 생성하겠습니다.",
        delay: 940,
      },
      {
        text: "결함 이미지 생성 중입니다…",
        delay: 3000,
      },
      {
        text: "생성이 완료되었습니다. 오른쪽 위 모서리에 과절단/미절단이 함께 나타나는 형태의 결함이 반영되었습니다.",
        delay: 980,
      },
      {
        text: "원하시면 결함 위치를 미세 조정하거나, 다른 절단 오류 유형으로도 변형해 드릴 수 있습니다.",
        delay: 760,
      },
    ],
    machineId: "laser_mc",
    attachments: [{ type: "video", url: "/answer_images/6f_3_video_h264.mp4" }],
    aiIcon: "/chat_icons/art_icon3.png",
    activeAgentName: "MicroDefectGen Agent",
    runDocSearch: null,
  },

  // 4번 : RAG 1 / DocReferring Agent
  "조립기 수명이 다해서 수동운전으로 전환해야해, 매뉴얼의 어떤 문서를 참조하면 될까?": {
    answer: [
      {
        text: "조립기의 수명이 다해 수동운전 모드로 전환해야 하는 경우, 매뉴얼 중에서는 **060. 조립기.docx** 문서가 가장 직접적으로 도움이 됩니다.",
        delay: 1200,
      },
      {
        text: "특히 해당 문서의 **‘나. 수동운전 화면’** 항목을 확인하시면 됩니다.",
        delay: 760,
      },
      {
        text:
          "포함 내용 예시:\n" +
          "• 수동운전 화면 구성\n" +
          "• 파레트 대기 / X·Y 테이블 / 로봇 영역별 개별 수동 조작\n" +
          "• 실린더, 서보, 축 등 주요 구성요소 조작 절차\n" +
          "• 화면 이동 방법(하단 메뉴 ‘수동운전’)\n" +
          "• 조립기 전용 수동 조작 상세 안내",
        delay: 1100,
      },
      {
        text: "원하시면 해당 섹션을 작업 흐름(단계별) 기준으로 더 짧게 요약해서 드릴 수도 있습니다.",
        delay: 780,
      },
    ],
    machineId: "assy_line",
    attachments: [],
    aiIcon: "/chat_icons/book_icon_s.png",
    activeAgentName: "DocReferring Agent",
    runDocSearch: "retrievedDocsQ4"
  },

  // 5번 : RAG 2 / DocReferring Agent
  "NC 머신의 안전도어 화면에서 안전문을 잠그는 방법은 뭐야?": {
    answer: [
      {
        text: "NC 머신에서 작업 전 안전문을 잠가야 한다면, NC 장비의 안전도어 기능을 설명한 문서를 확인하시는 것이 가장 정확합니다.",
        delay: 1200,
      },
      {
        text: "Retrieval 기준으로는 아래 문서를 참고하시면 됩니다.",
        delay: 790,
      },
      {
        text: "**040. NC.docx → 가. 메인화면** (안전도어 화면 설명 포함 구간)",
        delay: 760,
      },
      {
        text:
          "핵심 포인트:\n" +
          "• 안전도어 화면 이동: 하단 메뉴 ‘운전정보’ → 우측 메뉴 ‘안전도어’\n" +
          "• LOCK: 안전문이 닫힌 상태에서 LOCK 버튼을 누르면 잠김(버튼 녹색)\n" +
          "• UNLOCK: 수동운전 모드에서만 사용 가능(열림 상태 노란색)",
        delay: 1100,
      },
      {
        text: "따라서 **040. NC.docx / 가. 메인화면의 안전도어 섹션**을 참조하시면 됩니다.",
        delay: 780,
      },
    ],
    machineId: "nc_machining",
    attachments: [],
    aiIcon: "/chat_icons/book_icon_s.png",
    activeAgentName: "DocReferring Agent",
    runDocSearch: "retrievedDocsQ5"
  },

  // 6번 : 시계열 1 - 실시간 베어링 데이터 수명 문의 
  "실시간으로 수집한 베어링 데이터인데, 현재 기계의 수명을 알려줘.": {
    answer: [
      {
        text: "보내주신 파일만으로는 분석을 진행하기가 어렵습니다.",
        delay: 3500,
      },
      {
        text: "해당 데이터가 어느 장비에서 수집된 것인지 알려주실 수 있을까요?",
        delay: 880,
      },
      {
        text: "장비 모델명이나 설비 번호라도 확인되면, 예측/분석 정확도가 훨씬 좋아집니다.",
        delay: 720,
      },
    ],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon4.png",
    activeAgentName: null,
    runDocSearch: null,
  },

  // 7번 : 시계열 2 - Assy Line 데이터라고 추가 설명 / MultiPrognostic Agent
  "조립기에서 수집한 데이터야.": {
    answer: [
      {
        text: "조립기에서 실시간으로 수집한 베어링 데이터(bearing_001.csv)를 확인했습니다.",
        delay: 2400,
      },
      {
        text: "지금부터 사전에 학습된 베어링 잔여수명 예측 모델을 이용해 해당 데이터를 분석하겠습니다.",
        delay: 920,
      },
      {
        text: "베어링 신호를 분석 중입니다…",
        delay: 2500,
      },
      {
        text: "잔여 수명 예측을 수행하고 있습니다…",
        delay: 3000,
      },
      {
        text: "예측이 완료되었습니다. 현재 조립기 베어링의 잔여 수명은 약 90%로, 전반적으로 건강한 상태입니다.",
        delay: 1200,
      },
      {
        text: "또한 향후 50 스텝에 대한 잔여 수명 예측 결과도 함께 산출했습니다.",
        delay: 820,
      },
    ],
    machineId: "assy_line",
    attachments: [{ type: "image", url: "/answer_images/sm_chart.png" }],
    aiIcon: "/chat_icons/math_icon_s.png",
    activeAgentName: "MultiPrognostic Agent",
    runDocSearch: null,
  },

  // 8번 : 시계열 3 - 유지보수 조치 문의 / MultiPrognostic Agent
  "이어서 해당 베어링 데이터에 대해 어떤 유지보수 조치가 필요해?": {
    answer: [
      {
        text: "베어링 데이터(bearing_001.csv) 확인했습니다. 요청하신 대로 현재 상태를 기반으로 유지보수 조치를 정리하겠습니다.",
        delay: 2400,
      },
      {
        text: "베어링 신호 분석 중입니다…",
        delay: 1300,
      },
      {
        text: "분석이 완료되었습니다. 현재는 정상 동작 범위이며, 뚜렷한 결함 성장 패턴은 관찰되지 않습니다.",
        delay: 1100,
      },
      {
        text: "다만 장기적 신뢰성 확보를 위해 예방적 관리가 유효합니다.",
        delay: 720,
      },
      {
        text: "<Priority>\nPriority: Low – 즉각적인 개입은 필요하지 않음\nStrategy: 예방 중심 유지보수(Preventive Maintenance) + 주기적 상태 모니터링 유지",
        delay: 900,
      },
      {
        text: "<Required Actions>\n• 윤활유 상태 점검 및 보충\n• 베어링 하우징 및 체결 볼트 상태 확인\n• 주기적인 진동 모니터링 지속",
        delay: 860,
      },
    ],
    machineId: "assy_line",
    attachments: [],
    aiIcon: "/chat_icons/math_icon_s.png",
    activeAgentName: "MultiPrognostic Agent",
    runDocSearch: null,
  },

  // ====================== 키워드 매핑 시나리오 질문 ======================
  // 1번 : Agent를 사용하지 않는 질문
  "한국전자기술연구원": {
    answer: [
      
      {
        text: "네, 한국전자기술연구원(KETI)은 전자·ICT 분야 중심의 공공 성격 연구기관으로 알려져 있습니다.",
        delay: 1000,
      },
      {
        text: "대학처럼 기초학문 중심이라기보다 산업 현장에 적용 가능한 실용화 중심 R&D에 강점이 있으며, 기업(특히 중소·중견기업)과의 공동 연구, 기술이전, 상용화 지원을 수행합니다.",
        delay: 650,
      },
      {
        text: "또한 정부의 산업기술 R&D 과제와 연계된 연구를 수행하는 비중이 비교적 높은 편이라는 점도 자주 언급됩니다.",
        delay: 650,
      },
      {
        text: "연구 분야는 IoT/임베디드, 스마트팩토리, AI, 모빌리티, 로봇, 반도체·센서, 에너지, 통신·네트워크 등으로 폭넓지만, 구체적인 조직 구조나 최신 중점 분야는 시기에 따라 바뀔 수 있습니다.",
        delay: 650,
      }, 

    ],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon4.png",
    activeAgentName: null,
    runDocSearch: null,
  },

  // 2번 : 생성형 - 이미지로 NC 결함 합성 / MicroDefectGen Agent
  "결함": {
    answer: [
      {
        text: "정상 베어링 이미지를 확인했습니다.",
        delay: 2100,
      },
      {
        text: "지정하신 마스크 위치에 제조 공정에서 발생할 수 있는 대표적인 결함 패턴이 포함되도록 합성 이미지를 생성하겠습니다.",
        delay: 1200,
      },
      {
        text: "결함 이미지 생성 중입니다…",
        delay: 3000,
      },
      {
        text: "생성이 완료되었습니다. 요청하신 위치에 제조 과정에서 자주 관찰되는 흰색 긁힘(스크래치) 형태의 표면 결함이 반영되었습니다.",
        delay: 980,
      },
      {
        text: "원하시면 결함 강도(약/중/강)나 결함 유형을 바꿔서 추가 생성도 가능합니다.",
        delay: 760,
      },
    ],
    machineId: "nc_machining",
    attachments: [{ type: "video", url: "/answer_images/6f_1_video_h264.mp4" }],
    aiIcon: "/chat_icons/art_icon3.png",
    activeAgentName: "MicroDefectGen Agent",
    runDocSearch: null,
  },

  // 3번 : 시계열 - 실시간 베어링 데이터 분석 문의 / MultiPrognostic Agent
  "진동": {
    answer: [
      {
        text: "제조 공정에서 수집한 베어링 데이터(bearing_001.csv)를 확인했습니다.",
        delay: 2400,
      },
      {
        text: "지금부터 사전에 학습된 베어링 잔여수명 예측 모델을 이용해 해당 데이터를 분석하겠습니다.",
        delay: 920,
      },
      {
        text: "베어링 신호를 분석 중입니다…",
        delay: 2500,
      },
      {
        text: "잔여 수명 예측을 수행하고 있습니다…",
        delay: 3000,
      },
      {
        text: "예측이 완료되었습니다. 현재 베어링의 잔여 수명은 약 90%로, 전반적으로 건강한 상태입니다.",
        delay: 1200,
      },
      {
        text: "또한 향후 50 스텝에 대한 잔여 수명 예측 결과도 함께 산출했습니다.",
        delay: 820,
      },
    ],
    machineId: "assy_line",
    attachments: [{ type: "image", url: "/answer_images/sm_chart.png" }],
    aiIcon: "/chat_icons/math_icon_s.png",
    activeAgentName: "MultiPrognostic Agent",
    runDocSearch: null,
  },
  // 4번 : RAG / DocReferring Agent
  "매뉴얼": {
    answer: [
      {
        text: "조립기의 수명이 다해 수동운전 모드로 전환해야 하는 경우, 매뉴얼 중에서는 **060. 조립기.docx** 문서가 가장 직접적으로 도움이 됩니다.",
        delay: 1200,
      },
      {
        text: "특히 해당 문서의 **‘나. 수동운전 화면’** 항목을 확인하시면 됩니다.",
        delay: 760,
      },
      {
        text:
          "포함 내용 예시:\n" +
          "• 수동운전 화면 구성\n" +
          "• 파레트 대기 / X·Y 테이블 / 로봇 영역별 개별 수동 조작\n" +
          "• 실린더, 서보, 축 등 주요 구성요소 조작 절차\n" +
          "• 화면 이동 방법(하단 메뉴 ‘수동운전’)\n" +
          "• 조립기 전용 수동 조작 상세 안내",
        delay: 1100,
      },
      {
        text: "원하시면 해당 섹션을 작업 흐름(단계별) 기준으로 더 짧게 요약해서 드릴 수도 있습니다.",
        delay: 780,
      },
    ],
    machineId: "assy_line",
    attachments: [],
    aiIcon: "/chat_icons/book_icon_s.png",
    activeAgentName: "DocReferring Agent",
    runDocSearch: "retrievedDocsQ4"
  },




  // ====================== 확인용 질문 ======================
  video: {
    answer: [
      {
        text: "요청하신 영상 응답을 표시하겠습니다.",
        delay: 520,
      },
    ],
    machineId: null,
    attachments: [{ type: "video", url: "/answer_images/6f_1_video_h264.mp4" }],
    aiIcon: "/chat_icons/ai_icon4.png",
  },

  test: {
    answer: [
      {
        text: "베어링 데이터(bearing_001.csv) 확인했습니다. 요청하신 대로 상태 기반 유지보수 조치를 정리하겠습니다.",
        delay: 650,
      },
      {
        text: "베어링 신호 분석 중입니다…",
        delay: 900,
      },
      {
        text: "분석이 완료되었습니다. 현재는 정상 범위이며, 결함 성장 패턴은 뚜렷하지 않습니다.",
        delay: 980,
      },
      {
        text:
          "<Priority>\n" +
          "Priority: Low – 즉각적인 개입은 필요하지 않음\n" +
          "Strategy: 예방 중심 유지보수(Preventive Maintenance) + 주기적 상태 모니터링 유지",
        delay: 860,
      },
      {
        text:
          "<Required Actions>\n" +
          "• 윤활유 상태 점검 및 보충\n" +
          "• 베어링 하우징 및 체결 볼트 상태 확인\n" +
          "• 주기적인 진동 모니터링 지속",
        delay: 860,
      },
    ],
    machineId: "agv_ship",
    attachments: [],
    aiIcon: "/chat_icons/math_icon_s.png",
  },

  // ====================== icon 확인용 질문 ======================
  b: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/book_icon_s.png",
  },

  m: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/math_icon_s.png",
  },

  a1: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/art_icon.png",
  },

  a2: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/art_icon3.png",
  },

  n1: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon.png",
  },

  n2: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon2.png",
  },

  n3: {
    answer: [{ text: "답변입니다", delay: 520 }],
    machineId: null,
    attachments: [],
    aiIcon: "/chat_icons/ai_icon4.png",
  },
};

// list
export const qaList = Object.entries(qaMap).map(([q, a]) => ({ q, a }));

export function getAnswerByQuestion(input) {
  const normalized = input.trim();
  
  // 질문 전체 일치 확인
  if (qaMap[normalized]) {
    return qaMap[normalized];
  }

  // 키워드 포함 확인
  const keywords = Object.keys(qaMap);
  for (const key of keywords) {
    if (normalized.includes(key)) {
      return qaMap[key];
    }
  }

  // 질문 일치, 키워드 없을 경우 기본 답변 반환
  // return {
  //   answer: [
  //     {
  //       text: "등록된 답변이 없습니다.",
  //       delay: 520,
  //     },
  //   ],
  //   machineId: null,
  //   attachments: [],
  //   aiIcon: "/chat_icons/ai_icon4.png",
  // };
  return null;
}