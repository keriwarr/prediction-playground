import React, { useState } from "react";
import {
  BettingGameContainer,
  PlayerVisuals,
  BalanceDisplay,
  BetButtons,
  GameState,
} from "../components";

function MinigameDiceRollBetting() {
  const [betAmount, setBetAmount] = useState(0);
  const [gameState, setGameState] = useState(GameState.INITIAL);
  const [yourBalance, setYourBalance] = useState(0);
  const [opponentBalance, setOpponentBalance] = useState(0);
  const [potBalance, setPotBalance] = useState(0);
  const [diceRoll, setDiceRoll] = useState(null);
  const [rollCount, setRollCount] = useState(0);
  const opponentText = "I bet the die will show 1, 2, 3, or 4";

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
    setGameState(GameState.ROLLING);
  };

  const rollDice = () => {
    const diceSequence = [3, 5, 1, 4, 6, 2];
    const roll = diceSequence[rollCount % 6];
    setDiceRoll(roll);
    setRollCount((prevCount) => prevCount + 1);
    if (roll <= 4) {
      handleLoss();
    } else {
      handleWin();
    }
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
    setDiceRoll(null);
  };

  const continueGame = () => {
    setBetAmount(0);
    setGameState(GameState.INITIAL);
    setPotBalance(0);
    setDiceRoll(null);
  };

  const OddsButtons = ({ handleOdds }) => (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        Choose odds:
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
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
          onClick={() => handleOdds(4)}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          4:1
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

      {diceRoll && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            // fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          You rolled a {diceRoll}
        </div>
      )}
      {gameState === GameState.INITIAL && <BetButtons handleBet={handleBet} />}
      {gameState === GameState.CHOOSING_ODDS && (
        <OddsButtons handleOdds={handleOdds} />
      )}
      {gameState === GameState.ROLLING && (
        <div>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            &nbsp;
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={rollDice}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
              }}
            >
              Roll die
            </button>
          </div>
        </div>
      )}
      {gameState === GameState.FINISHED && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
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
          <button
            onClick={continueGame}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
            }}
          >
            Continue
          </button>
        </div>
      )}
    </BettingGameContainer>
  );
}

export const Stage31SixSidedDice = () => (
  <>
    <MinigameDiceRollBetting />
  </>
);
