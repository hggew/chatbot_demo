// src/ChatApp.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAnswerByQuestion } from "@/data/qa";
import { MACHINE_MARKERS } from "@/data/machineMarkers";
import PulseLoader from "react-spinners/PulseLoader";
import GridLoader from "react-spinners/GridLoader";

import MarkerCircle from "@/components/Marker";
import { Paperclip, X, FileText } from "lucide-react";
import RightSidebar from "@/components/RightSidebar";
import AgentStatusList from "@/components/AgentStatusList";
import { retrievedDocsQ4, retrievedDocsQ5 } from "@/data/retrievedDocs";
import { MACHINE_VIDEOS } from "@/data/machineVideos";

const CHATBOT_TITLE = "Factory AI Agent";
const MACHINE_TITLE = "Target Factory";
const WORD_DELAY = 60;
const MAX_FILES = 2;

function ShimmerText({ text, active = true, stepMs = 90 }) {
  if (!active) return <>{text}</>;
  const chars = Array.from(text);
  return (
    <span className="doc-shimmer" style={{ whiteSpace: "pre" }}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="doc-shimmer-char"
          style={{ animationDelay: `${i * stepMs}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

const INITIAL_CHAT_LIST = [
  { id: 1, title: "레이저 머신 배터리 잔량 점검 방법" },
  { id: 2, title: "프레스 설비 일상 점검 체크리스트 문의" },
  { id: 3, title: "설비 이상 진동 발생 시 조치 절차" },
  { id: 4, title: "생산 실적 데이터 CSV 업로드 분석 요청" },
  { id: 5, title: "야간 교대조 설비 알람 로그 확인" },
];

const HIDDEN_CHAT_ITEM_0 = { id: 0, title: "한국전자기술연구원 질문" };

function useDotAnimation(active, intervalMs = 350) {
  const [dots, setDots] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setDots("");
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [active, intervalMs]);

  return dots;
}

const ChatMessageRenderer = ({
  message,
  idx,
  isLastUserMessage,
  messageRefs,
  userIcon,
  docSearchDots,
}) => {
  const m = message;
  const isUser = m.from === "user";
  const aiIconFromMessage = m.aiIcon || "/chat_icons/art_icon.png";

  const ref = useCallback(
    (el) => {
      if (el) messageRefs.current[idx] = el;
    },
    [idx, messageRefs]
  );

  if (m.type === "doc-searching") {
    return (
      <div
        key={idx}
        ref={ref}
        className="flex justify-start -translate-x-[10px] items-end gap-2 my-4"
      >
        <img
          src="/chat_icons/book_icon_s.png"
          className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
          alt="doc"
        />
        <div className="text-sm font-semibold text-gray-600 whitespace-pre-wrap">
          문서 검색 중{docSearchDots}
        </div>
      </div>
    );
  }

  if (m.type === "file-group") {
    return (
      <div key={idx} ref={ref} className="flex justify-end items-end gap-2 my-4">
        <div
          className={`grid gap-2 ${m.files.length > 1 ? "grid-cols-2" : "grid-cols-1"
            } max-w-[70%]`}
        >
          {m.files.map((file, fIdx) => (
            <div key={fIdx} className="w-full">
              {file.type === "image" ? (
                <div className="bg-white border border-gray-900 rounded-2xl p-2 shadow-sm h-full flex items-center justify-center">
                  <img
                    src={file.url}
                    alt="첨부"
                    className="max-h-40 object-cover rounded-md w-full"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white border border-gray-900 rounded-2xl p-3 shadow-sm h-full min-w-[160px]">
                  <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {file.fileName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-6" />
      </div>
    );
  }

  if (["image", "file", "video"].includes(m.type)) {
    const isBot = !isUser;
    return (
      <div
        key={idx}
        ref={ref}
        className={`flex my-4 ${isUser
          ? "justify-end translate-x-[10px]"
          : "justify-start -translate-x-[10px]"
          } items-end gap-2`}
      >
        {isBot && <div className="w-8" />}
        <div
          className={`max-w-[70%] bg-white border mt-10  ${isUser ? "border-gray-900" : "border-gray-200"
            } rounded-2xl p-3 shadow-sm`}
        >
          {m.type === "image" && (
            <img src={m.url} className="max-h-64 object-contain rounded-md" />
          )}
          {m.type === "file" && (
            <div className="flex gap-3 items-center">
              <div className="bg-gray-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{m.fileName}</p>
                <p className="text-xs text-gray-500">파일 첨부됨</p>
              </div>
            </div>
          )}
          {m.type === "video" && (
            <video
              src={m.url}
              controls
              autoPlay
              className="w-full max-h-[500px] rounded-md"
              preload="metadata"
            />
          )}
        </div>
        {isUser && (
          <img
            src={userIcon}
            className="w-8 h-8 rounded-full border border-gray-200"
          />
        )}
      </div>
    );
  }

  if (m.type === "doc-preview") {
    return (
      <div
        key={idx}
        ref={ref}
        className="flex justify-start -translate-x-[10px] items-start my-4"
      >
        <div className="w-full">
          <div className="flex items-center gap-2">
            <img
              src="/chat_icons/book_icon_s.png"
              className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
              alt="doc"
            />
            <div className="text-sm text-gray-700 not-italic leading-none">
              <ShimmerText text="문서 검색 중" active={true} />
              <span className="doc-dots">{docSearchDots}</span>
            </div>
          </div>
          <div className="ml-10 mt-1 max-w-[70%] bg-transparent text-gray-400 italic text-sm whitespace-pre-wrap">
            <span className="font-semibold text-gray-500">{m.title}</span>
            {"\n"}
            {m.text}
          </div>
        </div>
      </div>
    );
  }

  if (m.type === "text") {
    return (
      <div
        key={idx}
        ref={ref}
        className={`flex ${isUser
          ? "justify-end translate-x-[10px] items-end"
          : "justify-start -translate-x-[10px]"
          } items-start gap-2`}
      >
        {!isUser ? (
          <>
            {m.isFirstInGroup ? (
              <img
                src={aiIconFromMessage}
                className="w-8 h-8 rounded-full border border-gray-200 flex-shrink-0"
              />
            ) : (
              <div className="w-8 flex-shrink-0" />
            )}
            <div className="max-w-[70%] text-sm  mt-1 text-gray-900 whitespace-pre-wrap leading-relaxed">
              {m.text}
            </div>
          </>
        ) : (
          <>
            <div className="max-w-[70%] px-4 py-2.5 my-5 bg-gray-900 text-white rounded-2xl rounded-br-sm text-sm whitespace-pre-wrap leading-relaxed">
              {m.text}
            </div>
            <img
              src={userIcon}
              className="w-8 h-8 rounded-full border mb-5"
            />
          </>
        )}
      </div>
    );
  }
  return <div key={idx} ref={ref} />;
};

const useFileUploader = (maxFiles) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(
    (e) => {
      const files = e.target.files;
      if (!files) return;
      const remaining = maxFiles - selectedFiles.length;
      if (remaining <= 0) return;
      const newFiles = Array.from(files).slice(0, remaining);
      const previews = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push({ url: reader.result, name: file.name, type: file.type });
          if (previews.length === newFiles.length) {
            setFilePreviews((prev) => [...prev, ...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    },
    [selectedFiles.length, maxFiles]
  );

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    setFilePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return { selectedFiles, filePreviews, fileInputRef, handleFileChange, handleRemoveFile, clearFiles };
};

const useChatLogic = (setSelectedMachineId, setActiveMachineVideo) => {
  const [messages, setMessages] = useState([]);
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  const playAnswerSequence = useCallback(
    (answerData, { onComplete } = {}) => {
      if (!answerData || !Array.isArray(answerData.answer)) {
        onComplete?.();
        return;
      }
      setIsTextLoading(true);
      const aiIcon = answerData.aiIcon || "/chat_icons/art_icon.png";
      let accumulatedDelay = 0;

      answerData.answer.forEach((step, idx) => {
        const text = step.text || "";
        const stepDelay = step.delay || 0;
        const words = text.split(" ");
        const startTime = accumulatedDelay + stepDelay;

        setTimeout(() => {
          let wordIndex = 0;
          let msgIndex = -1;
          setMessages((prev) => {
            const next = [
              ...prev,
              { from: "bot", type: "text", text: "", isFirstInGroup: idx === 0, aiIcon },
            ];
            msgIndex = next.length - 1;
            return next;
          });
          const intervalId = setInterval(() => {
            wordIndex++;
            const current = words.slice(0, wordIndex).join(" ");
            setMessages((prev) => {
              const clone = [...prev];
              clone[msgIndex] = { ...clone[msgIndex], text: current };
              if (wordIndex >= words.length) clearInterval(intervalId);
              return clone;
            });
          }, WORD_DELAY);
        }, startTime);
        accumulatedDelay += stepDelay + words.length * WORD_DELAY;
      });

      setTimeout(() => {
        setIsTextLoading(false);
        if (answerData.attachments?.length) {
          setIsMediaLoading(true);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              ...answerData.attachments.map((att) => ({
                from: "bot",
                type: att.type,
                url: att.url,
                fileName: att.fileName,
                aiIcon,
              })),
            ]);
            setIsMediaLoading(false);
            onComplete?.();
          }, 800);
        } else {
          onComplete?.();
        }
      }, accumulatedDelay + 200);

      if (answerData.machineId) {
        setSelectedMachineId(answerData.machineId);
        if (MACHINE_VIDEOS[answerData.machineId]) {
          setActiveMachineVideo(MACHINE_VIDEOS[answerData.machineId]);
        } else {
          setActiveMachineVideo(null);
        }
      } else {
        setActiveMachineVideo(null);
      }
    },
    [setSelectedMachineId, setActiveMachineVideo]
  );

  return { messages, setMessages, isTextLoading, setIsTextLoading, isMediaLoading, playAnswerSequence };
};

// local
// const fetchOllamaAnswer = async (userQuestion) => {
//   try {
//     const response = await fetch("http://172.21.21.13:11435/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "gpt-oss:120b-cloud", // 또는 사용 중인 모델명 (예: 'mistral', 'gemma')
//         messages: [
//           {
//             role: "user",
//             content: `${userQuestion}\n\n5문장 이내로 답변해.`,
//           },
//         ],
//         stream: false, // 단일 답변을 받기 위해 스트림 비활성화
//       }),
//     });

//     if (!response.ok) throw new Error("Ollama API 연결 실패");
//     const data = await response.json();
//     return data.message.content;
//   } catch (error) {
//     console.error("Ollama Error:", error);
//     return "죄송합니다. 현재 로컬 모델 서버에 연결할 수 없습니다.";
//   }
// };

const fetchOllamaAnswer = async (userQuestion) => {
  try {
    const response = await fetch("https://scientists-correspondence-oakland-nav.trycloudflare.com/api/chat", { // Vercel API Route 상대 경로
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // model: "llama3:8b",
        model: "gpt-oss:120b-cloud",
        messages: [
          {
            role: "user",
            content: `${userQuestion}\n\n5문장 이내로 한국어로 답변해.`,
          },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Proxy API 연결 실패");
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error("Ollama Error (via Proxy):", error);
    // 사용자에게 노출될 에러 메시지
    return "죄송합니다. 현재 사내 모델 서버에 접근할 수 없습니다. (네트워크 연결 확인 필요)";
  }
};

export default function ChatApp() {
  const [question, setQuestion] = useState("");
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [chatList, setChatList] = useState(INITIAL_CHAT_LIST);
  const [activeChatId, setActiveChatId] = useState(null);
  const [hasFirstChatSent, setHasFirstChatSent] = useState(false);
  const [activeMachineVideo, setActiveMachineVideo] = useState(null);

  const [isDocSearching, setIsDocSearching] = useState(false);
  const docSearchDots = useDotAnimation(isDocSearching, 350);

  const chatEndRef = useRef(null);
  const chatScrollRef = useRef(null);
  const messageRefs = useRef([]);

  const machineImageClass = activeMachineVideo
    ? "w-[95%] object-cover border-2 border-gray-400 rounded-2xl filter blur-sm"
    : "w-[95%] object-cover border-2 border-gray-400 rounded-2xl";

  const userIcon = "/chat_icons/user_icon.png";

  const { messages, setMessages, isTextLoading, setIsTextLoading, isMediaLoading, playAnswerSequence } =
    useChatLogic(setSelectedMachineId, setActiveMachineVideo);

  const [agentStatuses, setAgentStatuses] = useState([
    { id: "agent-1", name: "MultiPrognostic Agent", description: "Predicts bearing life cycles using realtime machine patterns", status: "idle" },
    { id: "agent-2", name: "MicroDefectGen Agent", description: "Generates defect-added synthetic images for analysis", status: "idle" },
    { id: "agent-3", name: "DocReferring Agent", description: "Finds relevant documents to support user's task or goal", status: "idle" },
  ]);

  const setAllAgentsIdle = useCallback(() => {
    setAgentStatuses((prev) => prev.map((a) => ({ ...a, status: "idle" })));
  }, []);

  // 변경: 질문 데이터의 activeAgentName에 따라 특정 에이전트만 가동시키는 로직으로 변경
  const setSpecificAgentRunning = useCallback((agentName) => {
    setAgentStatuses((prev) =>
      prev.map((agent) => ({
        ...agent,
        status: agent.name === agentName ? "running" : "idle",
      }))
    );
  }, []);

  const { selectedFiles, filePreviews, fileInputRef, handleFileChange, handleRemoveFile, clearFiles } = useFileUploader(MAX_FILES);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTextLoading, isMediaLoading, isDocSearching]);

  const truncateUtf8Bytes = (str = "", maxBytes = 100) => {
    const encoder = new TextEncoder();
    const s = String(str);
    let out = "";
    let used = 0;
    for (const ch of s) {
      const b = encoder.encode(ch).length;
      if (used + b > maxBytes) break;
      out += ch;
      used += b;
    }
    const truncated = out.length < s.length;
    return truncated ? out + "…" : out;
  };

  const clampPreviewText = (t = "", maxLines = 2, maxBytesPerLine = 100) => {
    const lines = String(t).split("\n");
    const sliced = lines.slice(0, maxLines).map((line) => truncateUtf8Bytes(line, maxBytesPerLine));
    const hasMoreLines = lines.length > maxLines;
    const anyLineTruncated = lines.slice(0, maxLines).some((line) => truncateUtf8Bytes(line, maxBytesPerLine) !== line);
    if (hasMoreLines && sliced.length > 0) {
      if (!sliced[sliced.length - 1].endsWith("…")) sliced[sliced.length - 1] = sliced[sliced.length - 1] + "…";
    } else if (anyLineTruncated) {
      if (!sliced[sliced.length - 1].endsWith("…")) sliced[sliced.length - 1] = sliced[sliced.length - 1] + "…";
    }
    return sliced.join("\n");
  };

  const runDocPreview = async (docs) => {
    setIsDocSearching(true);
    try {
      for (let i = 0; i < docs.length; i++) {
        setMessages((prev) => [
          ...prev,
          {
            type: "doc-preview",
            from: "bot",
            title: docs[i].title,
            text: clampPreviewText(docs[i].text, 2, 100),
          },
        ]);
        await new Promise((res) => setTimeout(res, 1600));
        setMessages((prev) => prev.filter((m) => m.type !== "doc-preview"));
      }
    } finally {
      setIsDocSearching(false);
    }
  };

  // const handleSend = async () => {
  //   const q = question.trim();
  //   const hasFiles = selectedFiles.length > 0;
  //   if (!q && !hasFiles) return;

  //   if (!hasFirstChatSent) {
  //     setHasFirstChatSent(true);
  //     setTimeout(() => {
  //       setChatList((prev) =>
  //         prev.some((c) => c.id === 0) ? prev : [HIDDEN_CHAT_ITEM_0, ...prev]);
  //       setActiveChatId(0);
  //     }, 5000);
  //   }

  //   const answerData = getAnswerByQuestion(q);
  //   const userMessages = [];

  //   if (hasFiles) {
  //     userMessages.push({
  //       from: "user",
  //       type: "file-group",
  //       files: selectedFiles.map((file, i) => ({
  //         type: file.type.startsWith("image/") ? "image" : "file",
  //         url: filePreviews[i].url,
  //         fileName: file.name,
  //       })),
  //     });
  //   }

  //   if (q) userMessages.push({ from: "user", type: "text", text: q });
  //   if (userMessages.length) setMessages((prev) => [...prev, ...userMessages]);

  //   setQuestion("");
  //   clearFiles();

  //   // 질문 데이터에 activeAgentName이 있으면 해당 에이전트 구동
  //   if (answerData?.activeAgentName) {
  //     setSpecificAgentRunning(answerData.activeAgentName);
  //   } else {
  //     setAllAgentsIdle();
  //   }

  //   // 질문 데이터에 runDocSearch 값이 있으면 해당 문서를 기반으로 프리뷰 실행
  //   if (answerData?.runDocSearch) {
  //     const docData = answerData.runDocSearch === "retrievedDocsQ4" ? retrievedDocsQ4 : retrievedDocsQ5;
  //     await runDocPreview(docData);
  //   }

  //   setAnswerCount((prev) => prev + 1);
  //   playAnswerSequence(answerData, { onComplete: setAllAgentsIdle });
  // };


  const handleSend = async () => {
    const q = question.trim();
    const hasFiles = selectedFiles.length > 0;
    if (!q && !hasFiles) return;

    // 첫 질문 시 채팅 목록 추가
    if (!hasFirstChatSent) {
      setHasFirstChatSent(true);
      setTimeout(() => {
        setChatList((prev) =>
          prev.some((c) => c.id === 0) ? prev : [HIDDEN_CHAT_ITEM_0, ...prev]);
        setActiveChatId(0);
      }, 5000);
    }

    // 1. 유저 메시지 UI 업데이트 (기존 로직 유지)
    const userMessages = [];
    if (hasFiles) {
      userMessages.push({
        from: "user",
        type: "file-group",
        files: selectedFiles.map((file, i) => ({
          type: file.type.startsWith("image/") ? "image" : "file",
          url: filePreviews[i].url,
          fileName: file.name,
        })),
      });
    }
    if (q) userMessages.push({ from: "user", type: "text", text: q });
    if (userMessages.length) setMessages((prev) => [...prev, ...userMessages]);

    setQuestion("");
    clearFiles();

    // 2. 답변 매핑 찾기
    let answerData = getAnswerByQuestion(q);

    if (answerData) {
      // 기존 QA 매핑 시나리오 (기존 로직 절대 유지)
      if (answerData.activeAgentName) setSpecificAgentRunning(answerData.activeAgentName);
      if (answerData.runDocSearch) {
        const docData = answerData.runDocSearch === "retrievedDocsQ4" ? retrievedDocsQ4 : retrievedDocsQ5;
        await runDocPreview(docData);
      }
      playAnswerSequence(answerData, { onComplete: setAllAgentsIdle });
    } else {
      console.log(`ollama 호출 : ${q}`);
      // 3. 매핑 데이터가 없는 경우 Ollama 호출
      setIsTextLoading(true);
      const aiResponseText = await fetchOllamaAnswer(q);

      // 온점(.)을 기준으로 문장을 분리하고 빈 문자열 제거, 분리된 각 문장에 대해 500ms delay 할당 배열 생성
      const sentences = aiResponseText
        .split(/(?<=\.)/g) // 온점을 포함하여 분리
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const ollamaFormattedAnswer = {
        // 첫 문장은 바로 시작, 이후 문장들은 500ms 간격으로 출력되도록 구성
        answer: sentences.map((sentence, index) => ({
          text: sentence,
          delay: index === 0 ? 0 : 500
        })),
        aiIcon: "/chat_icons/ai_icon4.png",
        machineId: null // 머신 비디오/정보 활성화 방지
      };

      setIsTextLoading(false);
      // 에이전트/비디오 로직 없이 순수하게 텍스트 시퀀스만 재생
      playAnswerSequence(ollamaFormattedAnswer, { onComplete: setAllAgentsIdle });
    }

    setAnswerCount((prev) => prev + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMarkerClick = (id) => setSelectedMachineId(id);
  const selectedMachine = MACHINE_MARKERS.find((m) => m.id === selectedMachineId);
  const selectedMachineName = selectedMachine?.label || "";
  const selectedMachineDescription = selectedMachine?.description || "";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full h-screen border border-gray-300 flex bg-white">
        <div className="w-[260px] border-r border-gray-200 flex-shrink-0 h-full">
          <RightSidebar
            chatItems={chatList}
            activeChatId={activeChatId}
            onNewChat={() => {
              setMessages([]);
              setQuestion("");
              clearFiles();
              setChatList(INITIAL_CHAT_LIST);
              setActiveChatId(null);
              setHasFirstChatSent(false);
              setSelectedMachineId(null);
              setAnswerCount(0);
              setActiveMachineVideo(null);
              setIsDocSearching(false);
              setAllAgentsIdle();
            }}
          />
        </div>

        <div className="flex-1 flex flex-col bg-white h-full">
          <div className="px-10 pt-6">
            <h1 className="text-2xl font-semibold text-gray-900">{CHATBOT_TITLE}</h1>
          </div>

          <div className="flex-1 flex flex-col px-10 pt-5 pb-1 bg-white min-h-0">
            <div className="rounded-3xl border border-gray-200 bg-neutral-50 px-6 py-6 flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto min-h-0" ref={chatScrollRef}>
                {messages.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/chat_icons/welcome.png" className="max-w-[60%] max-h-[60%] opacity-95" />
                  </div>
                ) : (
                  // <div className="max-w-3xl mx-auto space-y-4 ">
                  <div className="max-w-5xl mx-auto px-6 space-y-4">
                    {messages.map((m, idx) => (
                      <ChatMessageRenderer
                        key={idx}
                        message={m}
                        idx={idx}
                        userIcon={userIcon}
                        messageRefs={messageRefs}
                        docSearchDots={docSearchDots}
                      />
                    ))}

                    {isTextLoading && (
                      <div className="flex justify-start pt-2 -translate-x-[10px] items-center gap-2">
                        <div className="w-8" />
                        <div className="max-w-[70%] bg-white border border-gray-200 rounded-2xl px-4 py-2.5 flex items-center">
                          <PulseLoader loading size={8} color="#9ca3af" />
                        </div>
                      </div>
                    )}

                    {!isTextLoading && isMediaLoading && (
                      <div className="flex justify-start pt-3 -translate-x-[10px] items-center gap-2">
                        <div className="w-8" />
                        <div className="max-w-[70%] bg-neutral-100 border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-center">
                          <GridLoader loading size={12} color="#9ca3af" />
                        </div>
                      </div>
                    )}
                    <div id="chat-bottom-anchor" ref={chatEndRef} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-10 pb-6 pt-3 bg-white">
            {/* <div className="max-w-3xl mx-auto"> */}
            <div className="max-w-5xl mx-auto">
              {filePreviews.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg bg-neutral-50">
                  {filePreviews.map((preview, index) => {
                    const isImage = preview.type?.startsWith("image/");
                    return (
                      <div key={index} className="relative group w-20 h-20 rounded-lg overflow-hidden border bg-white flex items-center justify-center">
                        {isImage ? (
                          <img src={preview.url} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-1 text-center">
                            <FileText className="w-8 h-8 text-gray-400 mb-1" />
                            <span className="text-[10px] text-gray-600 truncate px-1">{preview.name}</span>
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-black flex items-center justify-center shadow-sm z-50 p-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm">
                <input
                  type="file"
                  accept="image/*, .csv, .json"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="w-9 h-9 text-gray-500 hover:bg-gray-100 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={selectedFiles.length >= MAX_FILES}
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="질문을 입력하세요"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 h-9 border-0 shadow-none focus-visible:ring-0 px-0 text-sm"
                />
                <Button
                  type="button"
                  onClick={handleSend}
                  size="icon"
                  className="rounded-full w-9 h-9 bg-gray-900 text-white flex items-center justify-center"
                  disabled={!question.trim() && selectedFiles.length === 0}
                >
                  ➤
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[25%] border-l border-gray-200 flex flex-col bg-white">
          <div className="px-10 pt-6">
            <h1 className="text-2xl font-semibold text-gray-900">{MACHINE_TITLE}</h1>
          </div>

          <div className="relative w-full pt-5 flex items-center justify-center">
            <img src="/machine_images/1f_machine.png" className={machineImageClass} />
            {activeMachineVideo && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <video
                  src={activeMachineVideo}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-[400px] h-[230px] object-cover rounded-2xl shadow-xl border border-gray-300 bg-black/70"
                />
              </div>
            )}
          </div>

          <div className="p-4">
            {selectedMachine ? (
              <div className="flex flex-col gap-3 m-8">
                <p className="text-lg font-semibold text-gray-900">{selectedMachineName}</p>
                <p className="text-md text-gray-600 whitespace-pre-wrap">{selectedMachineDescription}</p>
              </div>
            ) : (
              <p className="text-md mt-10 text-gray-400 text-center leading-relaxed">
                머신 라벨을 클릭하거나<br />관련 질문을 입력하면<br />해당 설비의 정보가 표시됩니다.
              </p>
            )}
          </div>

          <div className="mt-auto">
            <AgentStatusList agents={agentStatuses} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes docCharTwinkle {
          0%, 100% { opacity: 0.35; filter: brightness(1); }
          45%      { opacity: 1;    filter: brightness(1.6); }
          55%      { opacity: 1;    filter: brightness(1.6); }
        }
        .doc-shimmer-char {
          display: inline-block;
          animation: docCharTwinkle 1400ms infinite;
        }
        .doc-dots {
          display: inline-block;
          margin-left: 1px;
        }
      `}</style>
    </div>
  );
}