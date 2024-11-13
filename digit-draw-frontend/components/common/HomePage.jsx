import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [bets, setBets] = useState([]);
  const [results, setResults] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      setToken(accessToken);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/round/getRounds?status=active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRounds(response.data);
      } catch (error) {
        console.error("Error fetching rounds:", error);
      }
    };

    if (token) {
      fetchRounds();
    }
  }, [token]);

  const handleBetPlacement = async (e) => {
    e.preventDefault();
    const newBet = {
      roundId: selectedRound,
      betNumber: number,
      amount: parseFloat(amount),
      userId: userId,
    };

    console.log(newBet);

    try {
      const response = await axios.post(`http://localhost:3000/bet`, newBet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const placedBet = response.data;
      placedBet.contribution = calculateContribution(placedBet.amount);
      setBets([...bets, placedBet]);
      setNumber("");
      setAmount("");
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  const calculateContribution = (amount) => {
    const totalAmount = bets.reduce((acc, bet) => acc + bet.amount, 0) + amount;
    return ((amount / totalAmount) * 100).toFixed(2);
  };

  const handleResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bet/userBetsAndWinnings/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bet Placement</h1>

      <div className="mb-4">
        <label htmlFor="round" className="block text-gray-700 mb-1">
          Select Game Round:
        </label>
        <select
          id="round"
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
        >
          <option value="">Select a round</option>
          {rounds.map((round) => (
            <option key={round.id} value={round.id}>
              {round.id}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleBetPlacement} className="mb-4">
        <div className="mb-2">
          <label htmlFor="number" className="block text-gray-700 mb-1">
            Select a 4-digit number:
          </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
            maxLength="4"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="amount" className="block text-gray-700 mb-1">
            Enter amount:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Place Bet
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Recent Bets</h2>
      <ul className="mb-4">
        {bets.map((bet, index) => (
          <li key={index} className="mb-2">
            Number: {bet.number}, Amount: ${bet.amount}, Contribution:{" "}
            {bet.contribution}%
          </li>
        ))}
      </ul>

      <button
        onClick={handleResults}
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-4"
      >
        Show Results
      </button>

      <h2 className="text-xl font-bold mb-4">Results</h2>
      {results.userBets && results.userBets.length > 0 ? (
        <div>
          <ul>
            {results.userBets.map((result, index) => (
              <li key={index} className="mb-2">
                Round ID: {result.roundId}, Number: {result.betNumber}, Amount:
                ${result.amount}, Won: {result.won ? "Yes" : "No"}, Payout: $
                {result.payout}
              </li>
            ))}
          </ul>
          <p className="mt-4">Total Winnings: ${results.totalWinnings}</p>
          <p>Contribution Percentage: {results.contributionPercentage}%</p>
        </div>
      ) : (
        <p>No results available.</p>
      )}
    </div>
  );
}
