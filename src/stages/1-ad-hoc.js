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

function MinigameAdHocBetting() {
  const [betAmount, setBetAmount] = useState(0);
  const [gameState, setGameState] = useState(GameState.INITIAL);
  const [yourWinnings, setYourWinnings] = useState(0);
  const [opponentWinnings, setOpponentWinnings] = useState(0);
  const opponentText = "I bet you that _____";

  const handleBet = (amount) => {
    setBetAmount(amount);
    setGameState(GameState.BETTING);
  };

  const handleWin = () => {
    setYourWinnings((prevWinnings) => prevWinnings + betAmount);
    setOpponentWinnings((prevWinnings) => prevWinnings - betAmount);
    setGameState(GameState.FINISHED);
  };

  const handleLoss = () => {
    setYourWinnings((prevWinnings) => prevWinnings - betAmount);
    setOpponentWinnings((prevWinnings) => prevWinnings + betAmount);
    setGameState(GameState.FINISHED);
  };

  const resetGame = () => {
    setBetAmount(0);
    setGameState(GameState.INITIAL);
    setYourWinnings(0);
    setOpponentWinnings(0);
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
        <BalanceDisplay label="Your Winnings" balance={yourWinnings} />
        <BalanceDisplay label="Opponent Winnings" balance={opponentWinnings} />
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

export const Stage1AdHocBetting = () => (
  <>
    <p>
      Ever made a casual bet with a friend? "I bet you the Warriors win tonight"
      or "I bet it rains tomorrow"? That's ad hoc betting in its simplest form -
      just two people making a direct wager. Try it out above! Type in your
      prediction and an amount.
    </p>
    <p>
      In this basic setup, the odds are implied to be 1:1 (or "even odds"). This
      means if you bet $10 and win, you get $10 from your opponent. If you lose,
      they get $10 from you. Simple, but not always fair - after all, some
      outcomes are more likely than others!
    </p>
    <MinigameAdHocBetting />
  </>
);
