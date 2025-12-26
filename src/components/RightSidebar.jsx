// src/components/RightSidebar.jsx
import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings, SquarePen } from "lucide-react"

// 상단 메뉴 항목
const items = [
    {
        title: "새 채팅",
        url: "#",
        icon: SquarePen,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

// 기본 채팅 리스트 (1~5번) – 부모에서 안 주면 이걸 사용
const DEFAULT_CHAT_LIST = [
    { id: 1, title: "레이저 머신 배터리 잔량 점검 방법" },
    { id: 2, title: "프레스 설비 일상 점검 체크리스트 문의" },
    { id: 3, title: "설비 이상 진동 발생 시 조치 절차" },
    { id: 4, title: "생산 실적 데이터 CSV 업로드 분석 요청" },
    { id: 5, title: "야간 교대조 설비 알람 로그 확인" },
]

function RightSidebar({
    chatItems = DEFAULT_CHAT_LIST,
    activeChatId = null,
    onNewChat,              // 새 채팅 콜백 (있으면 사용, 없으면 무시)
}) {
    return (
        <Sidebar
            side="right"
            collapsible="none"
            className="h-full text-black bg-white"
        >
            {/* 가운데 영역(메뉴) */}
            <SidebarContent className="flex-1">
                <SidebarGroup>
                    {/* 상단 로고 */}
                    <SidebarGroupLabel className="flex items-center justify-center mx-4 mt-2 mb-4 px-5">
                        <img
                            src="/chat_icons/logo_ko_en.png"
                            alt="Factory Agent Logo"
                            className="w-auto object-contain"
                        />
                    </SidebarGroupLabel>

                    <SidebarGroupContent className="py-4">
                        {/* 상단 메뉴 영역 */}
                        <SidebarMenu>
                            {items.map((item) => {
                                const isNewChat = item.title === "새 채팅"

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="text-black hover:bg-gray-100"
                                        >
                                            <a
                                                href={item.url}
                                                className="flex items-center gap-2"
                                                onClick={(e) => {
                                                    if (isNewChat && onNewChat) {
                                                        e.preventDefault()
                                                        onNewChat()
                                                    }
                                                }}
                                            >
                                                <item.icon className="w-4 h-4 border-none" />
                                                <span className="text-sm font-medium text-black">
                                                    {item.title}
                                                </span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>

                        {/* 채팅 리스트 영역 */}
                        <div className="mt-6">
                            <p className="px-3 text-xs font-medium text-gray-400">
                                채팅
                            </p>

                            <SidebarMenu className="mt-2">
                                {chatItems.map((chat) => (
                                    <SidebarMenuItem key={chat.id}>
                                        <SidebarMenuButton
                                            className={
                                                activeChatId === chat.id
                                                    ? "text-black hover:bg-gray-200 border-none bg-gray-100" // 강조 스타일
                                                    : "text-black hover:bg-gray-100 border-none bg-white"     // 기본 스타일
                                            }
                                        >
                                            <span className="text-sm font-medium ">
                                                {chat.title}
                                            </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* 하단 사용자 정보 영역 */}
            <SidebarFooter className="mt-auto border-t border-gray-200 bg-white sticky bottom-0">
                <div className="flex items-center gap-3 px-3 py-3">
                    <img
                        src="/chat_icons/user_icon.png"
                        alt="User"
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-black truncate">
                            김윤한
                        </span>
                        <span className="text-xs text-black truncate">
                            yunhan.kim@keti.re.kr
                        </span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default RightSidebar
