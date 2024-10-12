import React, { useState } from "react";

const PlayerSVG = ({ isYou }) => (
  <svg width="60" height="100" viewBox="0 0 60 100">
    <circle cx="30" cy="25" r="20" fill={isYou ? "#1E90FF" : "#f44336"} />
    <path
      d="M15 50 Q30 60 45 50 L45 90 Q30 100 15 90 Z"
      fill={isYou ? "#1E90FF" : "#f44336"}
    />
  </svg>
);

const SpeechBubble = ({ text, isRight }) => (
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

const BettingGameContainer = ({ children }) => (
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

const PlayerVisuals = ({ opponentText }) => (
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

const BalanceDisplay = ({ label, balance }) => (
  <div
    style={{
      color: balance > 0 ? "green" : balance < 0 ? "red" : "black",
      fontWeight: "bold",
    }}
  >
    {label}: ${balance}
  </div>
);

const BetButtons = ({ handleBet }) => (
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

const BettingButtons = ({ handleWin, handleLoss }) => (
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

const ResetButton = ({ resetGame }) => (
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

const GameState = {
  INITIAL: "initial",
  BETTING: "betting",
  FINISHED: "finished",
  CHOOSING_ODDS: "choosing_odds",
  ROLLING: "rolling",
};

function AdHocBetting() {
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

function PotBetting() {
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

function UnevenOddsBetting() {
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

function DiceRollBetting() {
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

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Prediction Markets from First Principles
      </h1>
      <section>
        <h2>1. Ad Hoc Betting</h2>
        {/* <p>
          Ever made a casual bet with a friend? "I bet you the Warriors win
          tonight" or "I bet it rains tomorrow"? That's ad hoc betting in its
          simplest form - just two people making a direct wager. Try it out
          above! Type in your prediction and an amount.
        </p>
        <p>
          In this basic setup, the odds are implied to be 1:1 (or "even odds").
          This means if you bet $10 and win, you get $10 from your opponent. If
          you lose, they get $10 from you. Simple, but not always fair - after
          all, some outcomes are more likely than others!
        </p> */}
        <AdHocBetting />
      </section>
      <section>
        <h2>2. Betting into a Pot</h2>
        {/* <p>
          Now let's add a small twist - instead of money changing hands
          directly, both players put their stakes into a shared pot. When the
          outcome is decided, the winner takes the whole pot.
        </p>
        <p>
          While this might seem like the same thing (and mathematically, it is),
          thinking about bets in terms of a pot becomes important later. It's
          the first step toward understanding how modern prediction markets
          work.
        </p>
        <p>
          Try making a bet in this version. Notice how the pot balance updates
          as bets are placed. Either player can win or lose up to the amount in
          the pot, but no more.
        </p> */}
        <PotBetting />
      </section>
      <section>
        <h2>3. Uneven Odds</h2>
        {/* <p>
          Now let's introduce the concept of uneven odds. In real-world
          scenarios, not all outcomes are equally likely. This is where odds
          come into play.
        </p>
        <p>
          In this version, after choosing your bet amount, you also get to
          choose the odds: 2:1, 1:1, or 1:2. These odds determine how much each
          player contributes to the pot and how much they stand to win or lose.
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
        <p>Try it out and see how different odds affect the game!</p> */}
        <UnevenOddsBetting />
        <h3>Six sided dice</h3>
        <DiceRollBetting />
      </section>
      <section>
        <h2>4. Probabilities</h2>
        {/* <p>
          Let's now look at a more concrete example involving probabilities. In
          this game, your opponent bets that a six-sided die will show 1, 2, 3,
          or 4. You're betting against this, so you win if the die shows 5 or 6.
        </p>
        <p>
          The probability of your opponent winning is 4/6 (or 2/3), while your
          probability of winning is 2/6 (or 1/3). Fair odds would be 2:1 in your
          opponent's favor.
        </p>
        <p>
          In this game, you can choose your bet size and then pick from three
          sets of odds: 1:1 (even), 2:1 (fair), or 4:1 (in your opponent's
          favor). After you choose, we'll roll the die for you and see the
          outcome!
        </p>
        <p>
          Think about which odds give you an advantage, which are fair, and
          which favor your opponent. How does this relate to real-world betting
          scenarios?
        </p> */}
        <h3>4.1. Converting Odds to Probabilities</h3>
        <h3>4.2. Different Odds Notations</h3>
      </section>
      <section>
        <h2>5. Limit Orders</h2>
      </section>
      <section>
        <h2>6. Multiple Offers</h2>
      </section>
      <section>
        <h2>7. Two-Sided Market</h2>
      </section>
      <section>
        <h2>8. Market Visualization</h2>
      </section>
      <section>
        <h2>9. Market Liquidity</h2>
      </section>
      <section>
        <h2>10. Share Distribution</h2>
      </section>
      <section>
        <h2>11. Yes/No Shares</h2>
      </section>
      <section>
        <h2>12. Profitable Exits</h2>
        <h3>12.1. Market Making</h3>
        <h3>12.2. Position Selling</h3>
      </section>
      <section>
        <h2>13. Cutting Losses</h2>
      </section>
    </div>
  );
}

export default App;
