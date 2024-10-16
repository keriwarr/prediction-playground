import React from "react";

export const PlayerSVG = ({ isYou }) => (
  <svg width="60" height="100" viewBox="0 0 60 100">
    <circle cx="30" cy="25" r="20" fill={isYou ? "#1E90FF" : "#f44336"} />
    <path
      d="M15 50 Q30 60 45 50 L45 90 Q30 100 15 90 Z"
      fill={isYou ? "#1E90FF" : "#f44336"}
    />
  </svg>
);

export const SpeechBubble = ({ text, isRight }) => (
  <div
    style={{
      position: "relative",
      background: "white",
      borderRadius: "10px",
      padding: "10px",
      marginLeft: isRight ? "10px" : "0",
      marginRight: isRight ? "0" : "10px",
      border: "2px solid #333",
      maxWidth: "150px",
    }}
  >
    {text}
  </div>
);

export const BettingGameContainer = ({ children }) => (
  <div
    style={{
      border: "1px solid black",
      padding: "20px",
      margin: "20px auto",
      width: "600px",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >
    {children}
  </div>
);

export const PlayerVisuals = ({ opponentText }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <PlayerSVG isYou={true} />
      <SpeechBubble text="You're on!" isRight={true} />
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <SpeechBubble text={opponentText} isRight={false} />
      <PlayerSVG isYou={false} />
    </div>
  </div>
);

export const BalanceDisplay = ({ label, balance }) => (
  <div
    style={{
      color: balance > 0 ? "green" : balance < 0 ? "red" : "black",
      fontWeight: "bold",
    }}
  >
    {label}: ${balance}
  </div>
);

export const BetButtons = ({ handleBet }) => (
  <div>
    <div style={{ textAlign: "center", marginBottom: "10px" }}>Pick one:</div>
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <button
        onClick={() => handleBet(10)}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Bet $10
      </button>
      <button
        onClick={() => handleBet(20)}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Bet $20
      </button>
      <button
        onClick={() => handleBet(50)}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Bet $50
      </button>
    </div>
  </div>
);

export const BettingButtons = ({ handleWin, handleLoss }) => (
  <div>
    <div style={{ textAlign: "center", marginBottom: "10px" }}>Pick one:</div>
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <button
        onClick={handleWin}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        You Won
      </button>
      <button
        onClick={handleLoss}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
        }}
      >
        You Lost
      </button>
    </div>
  </div>
);

export const ResetButton = ({ resetGame }) => (
  <div>
    <div style={{ textAlign: "center", marginBottom: "10px" }}>&nbsp;</div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button
        onClick={resetGame}
        style={{
          padding: "5px 10px",
          borderRadius: "5px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
        }}
      >
        Reset
      </button>
    </div>
  </div>
);

export const GameState = {
  INITIAL: "initial",
  BETTING: "betting",
  FINISHED: "finished",
  CHOOSING_ODDS: "choosing_odds",
  ROLLING: "rolling",
};
