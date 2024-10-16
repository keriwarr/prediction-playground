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

function MinigamePotBetting() {
  const [gameState, setGameState] = useState(GameState.INITIAL);
  const [yourBalance, setYourBalance] = useState(0);
  const [opponentBalance, setOpponentBalance] = useState(0);
  const [potBalance, setPotBalance] = useState(0);
  const opponentText = "I bet you that _____";

  const handleBet = (amount) => {
    setYourBalance((prevBalance) => prevBalance - amount);
    setOpponentBalance((prevBalance) => prevBalance - amount);
    setPotBalance(amount * 2);
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
    setGameState(GameState.INITIAL);
    setYourBalance(0);
    setOpponentBalance(0);
    setPotBalance(0);
  };

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
      {gameState === GameState.BETTING && (
        <BettingButtons handleWin={handleWin} handleLoss={handleLoss} />
      )}
      {gameState === GameState.FINISHED && (
        <ResetButton resetGame={resetGame} />
      )}
    </BettingGameContainer>
  );
}

export const Stage2PotBetting = () => (
  <>
    <p>
      Now let's add a small twist - instead of money changing hands directly,
      both players put their stakes into a shared pot. When the outcome is
      decided, the winner takes the whole pot.
    </p>
    <p>
      While this might seem like the same thing (and mathematically, it is),
      thinking about bets in terms of a pot becomes important later. It's the
      first step toward understanding how modern prediction markets work.
    </p>
    <p>
      Try making a bet in this version. Notice how the pot balance updates as
      bets are placed. Either player can win or lose up to the amount in the
      pot, but no more.
    </p>
    <MinigamePotBetting />
  </>
);
