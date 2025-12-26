// src/LoginPage.jsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FADE_IN_DURATION_MS = 2500;   // 로고 페이드 인 시간 
const DELAY_AFTER_FADE_MS = 1000;   // 로고 페이드 인 후 대기 시간
const SLIDE_FADE_DURATION_MS = 1000; // 슬라이드 및 폼 페이드 인 시간 

export default function LoginPage({ onSuccess }) {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const [isLogoFadedIn, setIsLogoFadedIn] = useState(false); // 로고 초기 페이드 인 상태
    const [isFormVisible, setIsFormVisible] = useState(false); // 로고 슬라이드/폼 페이드 인 상태

    useEffect(() => {
        // A. 초기 렌더링 후 로고 페이드 인 시작
        setTimeout(() => setIsLogoFadedIn(true), 50);

        // B. 로고 페이드 인 완료 (2.5초) + 2초 대기 후, 최종 애니메이션 시작
        const totalDelay = FADE_IN_DURATION_MS + DELAY_AFTER_FADE_MS;
        const formTimer = setTimeout(() => {
            setIsFormVisible(true);
        }, totalDelay);

        return () => {
            clearTimeout(formTimer);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError("");

        if (!loginId.trim() || !password.trim()) {
            setLoginError("아이디와 비밀번호를 모두 입력해 주세요.");
            return;
        }

        onSuccess?.();
    };

    // 로고 페이드 인
    const logoFadeStyle = {
        transition: `opacity ${FADE_IN_DURATION_MS / 1000}s ease-in`,
        opacity: isLogoFadedIn ? 1 : 0,
    };

    // 로고 슬라이드 아웃 / 폼 페이드인
    const logoSlideStyle = {
        transition: `transform ${SLIDE_FADE_DURATION_MS / 1000}s ease-in-out`,
        transform: isFormVisible ? 'translateX(0%)' : 'translateX(10vw)',
    };

    const loginAppearStyle = {
        transition: `opacity ${SLIDE_FADE_DURATION_MS / 1000}s ease-in`,
        opacity: isFormVisible ? 1 : 0,
    };

    return (
        <div className="min-h-screen flex w-full">
            {/* 왼쪽: 로고 영역 */}
            <div
                className="flex-1 flex items-center justify-center bg-white"
                style={logoSlideStyle} // 슬라이드 아웃 애니메이션 및 초기 정중앙 보정 적용
            >
                <div
                    className="flex flex-col items-center justify-center gap-10"
                    style={logoFadeStyle} // 초기 페이드 인 애니메이션 적용
                >
                    <div className="flex items-center gap-20">
                        <img
                            src="/chat_icons/logo_ko_en.png"
                            alt="KETI 로고"
                            className="h-48 object-contain"
                        />
                        <img
                            src="/chat_icons/smic_logo.png"
                            alt="SMIC 로고"
                            className="h-40 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* 오른쪽: 로그인 영역 */}
            <div
                className="w-[30%] bg-neutral-100 flex items-center justify-center shrink-0"
                style={loginAppearStyle}
            >
                <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-gray-200 px-10 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Factory AI Agent
                    </h1>
                    <p className="text-md text-gray-600 mb-8">
                        공장 설비용 AI 어시스턴트 서비스에 로그인해 주세요.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">
                                아이디
                            </label>
                            <Input
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                placeholder="example@company.com"
                                className="h-11 text-base p-4"
                            />
                        </div>

                        <div>
                            <label className="block text-md font-medium text-gray-700 mb-2">
                                비밀번호
                            </label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                                className="h-11 text-base p-4"
                            />
                        </div>

                        {loginError && (
                            <p className="text-md text-red-600 mt-2 font-medium">{loginError}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-13 mt-6 bg-gray-900 hover:bg-gray-800 text-md font-semibold text-white transition duration-200"
                        >
                            로그인
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}