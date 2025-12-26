// data/machineMarkers.js : 1f_machine 위에 올릴 마커 데이터

export const MACHINE_MARKERS = [
  {
    id: "kitting_zone",
    label: "Kitting Zone",
    top: "45%",
    left: "12.0%", 
    color: "#3b82f6",
    imageFile: "kitting_zone.jpg",
    description: `MASTER로부터 부여받은 “생산시리얼코드“의 제품정보를 토대로 생산을 개시합니다.
업무 완료 후 공정 작업 이상 유무를 기록하여 MASTER에 보고하고 해당 생산시리얼코드는 다음 공정으로 전달됩니다.
이 “생산시리얼코드” 각 공정의 정보를 반영하여 마지막 공정까지 전달되게 됩니다.`,
  },
  {
    id: "kitting_amr",
    label: "Kitting AMR",
    top: "62%",
    left: "7.25%",  
    color: "#a810b9ff",
    imageFile: null,
  },
  {
    id: "laser_mc",
    label: "Laser M/C",
    top: "52%",
    left: "28.15%",  
    color: "#10b981",
    imageFile: "laser_mc.jpg",
    description: `KIOSK에서 주문된 고객정보(성함, 회사명, 전화번호, 이메일 주소)를 명판에 각인합니다.
또한, 자동생산 시간 외에는 명판 원판 아크릴을 KITTING으로부터 수령하여 16분할 Cutting 후 재차 KITTING에 적재하는 업무도 수행하고 있어 가동상황 및 재고관리를 통한 자율제조에 대응하고 있습니다.

부자재에 고객 주문정로를 각인 및 설비 현황에 따라 원자재 가공도 동시에 수행
레이저, 컨베이어, 반송로봇으로 구성되며, FA-IT 연계기술을 통해 고객의 주문정보를 반영`,
  },
  {
    id: "nc_machining",
    label: "NC Machining",
    top: "52%",
    left: "43.35%", 
    color: "#ef4444",
    imageFile: "nc_machining.jpg",
    description: `LASER 가공기에서 고객정보를 각인 한 명판을 AMR로 부터 수령해 2차 가공인 사면 면취 작업을 수행합니다. 본 CNC 장비는 미쓰비시의 M80 시리즈를 적용한 코마텍사 장비를 사용하고 있습니다. 명판은 AMR을 통해 수령, 수령된 명판은 CC-Link IE TSN 대응 MELSERVO-J5 서보가 채용된 직교로봇을 통해 투입되어지고 있습니다.
CNC에서는 직교로봇에 적용된 J5 서보의 설정 상태(서보 파라미터, 속도, 위치 값 등), 절삭공구 마모 상태, 가공 결과, Work Probe를 통한 검사 결과를 감시하고 GOT에 표시하고 있습니다.`,
  },
  {
    id: "agv_ship",
    label: "AGV_SHIP",
    top: "70%",
    left: "47.15%",  
    color: "#f97316",
  },
  {
    id: "amr_conv",
    label: "AMR_Conv",
    top: "70%",
    left: "18.65%", 
    color: "#fbbf24",
    imageFile: null,
  },
  {
    id: "assy_line",
    label: "Assy Line",
    top: "60%",
    left: "63.3%",  
    color: "#0ea5e9",
    imageFile: "assy_line.jpg",
    description: `설명 CNC 가공 후 PALLET를 자동 이송·조립·검사·포장하는 유연 혼류 생산 시스템입니다.
• 동일 조립장비 3대, MODULE·DOCKING 방식으로 증설·JOB 변경이 가능하도록 구성했습니다.
• 조립1~3 사용 여부와 투입 순서를 유저가 가동 상황에 맞게 제어할 수 있습니다.
• Name Plate는 Cell, 문구세트는 Line, 동시 생산 시 Cell+Line 혼류 방식으로 운용합니다.
• Master PLC가 조립기1~3 작업과 반송·버퍼 대기를 실시간 제어합니다.
• 조립·검사·포장에 로봇틱스, AI, SmartPlus 역각센서를 적용해 정밀 조립을 구현했습니다.`,
  },
  {
    id: "transfer",
    label: "Transfer",
    top: "50%",
    left: "70.0%",  
    color: "#64748b",
    imageFile: "transfer.jpg",
  },
  {
    id: "shipment",
    label: "Shipment",
    top: "50%",
    left: "89.9%",  
    color: "#f43f5e",
    imageFile: "shipment.jpg",
    description: `포장된 완성품은 QR AGV을 통해 각각 비어 있는 선반에 완성품을 배치하게 됩니다.
고객께서는 선반 위의 GOT를 확인 후 본인의 제품을 가져가시면 됩니다.`,
  },
  {
    id: "inspection",
    label: "Inspection",
    top: "60%",
    left: "76.6%",  
    color: "#8b5cf6",
    imageFile: "inspection.jpg",
    description: `조립 공정에서 전달받은 완성 NAME PLATE와 문구 세트를 최종 검사하는 공정입니다.
Robot 통신은 CC-Link IE Field을 사용하여 구성하고 있으며, Robot에는 2D Vision 센서와 변위센서를 부착하여 반복 검사를 실행하고 있습니다.
2D Vision으로 기종을 판별하는 방법은 Case A/B/C 별로 다르게 그어있는 선으로 판별합니다. Case A는 줄1개, Case B는 줄2개, Case C는 줄3개 이 조합 통해 생산시리얼코드 내 생산정보와 매칭시켜 기종판별을 진행합니다.
또한 Hivision S/W를 사용하여 한글/영문이름을 딥러닝하고, 해당 Data를 토대로 이름의 비젼인식합니다.
인식한 정보와 PLC Data 정보를 매칭시켜 오자를 판별합니다. 문구 세트는 표면의 손상 상태를 비젼을 통해 검사합니다.
변위센서로는 Top Cover 및 Back Plate의 조립상태를 검사하고 있습니다. 비전 기종 검사 결과, 변위센서 검사 결과, 로봇 TOOL 사용 현황을 감시하고 GOT에 표현하고 있으며, 작업자가 설정한 허용공차 안에 들어오지 않으면 NG를 발생시키고 NG품은 배출 되며 재생산 지령이 내려지게 됩니다.`,
  },
  {
    id: "packaging",
    label: "Packaging",
    top: "65%",
    left: "86.1%", 
    color: "#6366f1",
    imageFile: "packing.jpg",
    description: `쇼핑백 투입구는 별도의 투입기계장치를 사용하지 않고, 적재대만 구성하고 있습니다.
대신 로봇의 비젼을 사용하여 쇼핑백의 방향을 인식하고 쇼핑백 투입방향에 맞게 로봇 티칭포인트를 조정하여 Pick & Place 하고 있습니다. 그 외 프린트물을 쇼핑백에 넣거나, 쇼핑백을 피는 등의 로봇틱스 기술도 선보이고 있습니다.
또한 Shopping Bag에는 Kitting~포장기까지 각 공정생산 과정의 Edge 분석결과인 TEST 보고서도 같이 동봉되고 있습니다.

TEST 보고서 내에는
1.OEE UP : 설비 종합 효율 상승
2.Get Lead-time : 리드 타임 확보
3.FTY UP : 직행률 상승
4.TroubleShooting : 트러블 슈팅 시간 절감
5.Maintenance : 유지보수시간절감
6.Management : 자재관리시간절감
7.Energy Saving : 에너지절감
의 정보를 담고 있습니다.`,
  },
];