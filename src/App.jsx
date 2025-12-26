// src/App.jsx
import { useState } from "react";
import ChatApp from "./ChatApp";
import LoginPage from "./LoginPage";

const STAGE = {
  LOGIN: "login",
  CHAT: "chat",
};


export default function App() {

  const [currentStage, setCurrentStage] = useState(STAGE.LOGIN);

  const handleLoginSuccess = () => {
    setCurrentStage(STAGE.CHAT);
  };

  return currentStage === STAGE.LOGIN ? (
    <LoginPage onSuccess={handleLoginSuccess} />
  ) : currentStage === STAGE.CHAT ? (
    <ChatApp />
  ) : null;
}