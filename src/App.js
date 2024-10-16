import React from "react";
import { Stage1AdHocBetting } from "./stages/1-ad-hoc";
import { Stage2PotBetting } from "./stages/2-pot-betting";
import { Stage31SixSidedDice } from "./stages/3-1-six-sided-dice";
import { Stage3UnevenOdds } from "./stages/3-uneven-odds";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>From Bets to Prediction Markets</h1>
      <section>
        <h2>1. Ad Hoc Betting</h2>
        <Stage1AdHocBetting />
      </section>
      <section>
        <h2>2. Betting into a Pot</h2>
        <Stage2PotBetting />
      </section>
      <section>
        <h2>3. Uneven Odds</h2>
        <Stage3UnevenOdds />
        <h3>3.1. Six sided dice</h3>
        <Stage31SixSidedDice />
      </section>
      <section>
        <h2>4. Probabilities</h2>
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
