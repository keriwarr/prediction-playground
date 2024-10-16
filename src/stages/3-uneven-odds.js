import React, { useState } from "react";
import {
  BettingGameContainer,
  PlayerVisuals,
  BalanceDisplay,
  BetButtons,
  BettingButtons,
  ResetButton,
  GameState,
} from "../components";

function MinigameUnevenOddsBetting() {
  const [betAmount, setBetAmount] = useState(0);
  const [gameState, setGameState] = useState(GameState.INITIAL);
  const [yourBalance, setYourBalance] = useState(0);
  const [opponentBalance, setOpponentBalance] = useState(0);
  const [potBalance, setPotBalance] = useState(0);
  const opponentText = "I bet you that _____";

  const handleBet = (amount) => {
    setBetAmount(amount);
    setGameState(GameState.CHOOSING_ODDS);
  };

  const handleOdds = (selectedOdds) => {
    const yourContribution = betAmount;
    const opponentContribution = betAmount * selectedOdds;
    setYourBalance((prevBalance) => prevBalance - yourContribution);
    setOpponentBalance((prevBalance) => prevBalance - opponentContribution);
    setPotBalance(yourContribution + opponentContribution);
    setGameState(GameState.BETTING);
  };

  const handleWin = () => {
    setYourBalance((prevBalance) => prevBalance + potBalance);
    setPotBalance(0);
    setGameState(GameState.FINISHED);
  };

  const handleLoss = () => {
    setOpponentBalance((prevBalance) => prevBalance + potBalance);
    setPotBalance(0);
    setGameState(GameState.FINISHED);
  };

  const resetGame = () => {
    setBetAmount(0);
    setGameState(GameState.INITIAL);
    setYourBalance(0);
    setOpponentBalance(0);
    setPotBalance(0);
  };

  const OddsButtons = ({ handleOdds }) => (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        Choose odds:
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => handleOdds(2)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          2:1
        </button>
        <button
          onClick={() => handleOdds(1)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          1:1
        </button>
        <button
          onClick={() => handleOdds(0.5)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          1:2
        </button>
      </div>
    </div>
  );

  return (
    <BettingGameContainer>
      <PlayerVisuals opponentText={opponentText} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <BalanceDisplay label="Your Balance" balance={yourBalance} />
        <BalanceDisplay label="Opponent Balance" balance={opponentBalance} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Pot Balance: ${potBalance}
      </div>
      {gameState === GameState.INITIAL && <BetButtons handleBet={handleBet} />}
      {gameState === GameState.CHOOSING_ODDS && (
        <OddsButtons handleOdds={handleOdds} />
      )}
      {gameState === GameState.BETTING && (
        <BettingButtons handleWin={handleWin} handleLoss={handleLoss} />
      )}
      {gameState === GameState.FINISHED && (
        <ResetButton resetGame={resetGame} />
      )}
    </BettingGameContainer>
  );
}

export const Stage3UnevenOdds = () => (
  <>
    <p>
      Now let's introduce the concept of uneven odds. In real-world scenarios,
      not all outcomes are equally likely. This is where odds come into play.
    </p>
    <p>
      In this version, after choosing your bet amount, you also get to choose
      the odds: 2:1, 1:1, or 1:2. These odds determine how much each player
      contributes to the pot and how much they stand to win or lose.
    </p>
    <p>
      For example, if you bet $10 at 2:1 odds:
      <ul>
        <li>You put $10 into the pot</li>
        <li>Your opponent puts $20 into the pot</li>
        <li>If you win, you get the entire $30 pot</li>
        <li>If you lose, your opponent gets the entire $30 pot</li>
      </ul>
    </p>
    <p>Try it out and see how different odds affect the game!</p>
    <MinigameUnevenOddsBetting />
  </>
);
