import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("active");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [winningNumber, setWinningNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          activeTab === "active"
            ? `http://localhost:3000/round/getRounds?status=${activeTab}`
            : `http://localhost:3000/result/getResults`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setErrorMessage(""); // Clear any previous error message
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, token]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateRound = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/round/initRound",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally, you can fetch the updated data after creating a new round
      const updatedData = await axios.get(
        `http://localhost:3000/round/getRounds?status=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(updatedData.data);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error creating round:", error);
      setErrorMessage("Error creating round. Please try again.");
    }
  };

  const handleEndRound = async (roundId) => {
    try {
      await axios.post(
        `http://localhost:3000/round/endRound/${roundId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch the updated data after ending the round
      const updatedData = await axios.get(
        `http://localhost:3000/round/getRounds?status=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(updatedData.data);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error ending round:", error);
      setErrorMessage("Error ending round. Please try again.");
    }
  };

  const handleAddWinningNumber = (roundId) => {
    setSelectedRoundId(roundId);
    setShowModal(true);
  };

  const handleUpdateWinningNumber = async () => {
    try {
      await axios.post(
        `http://localhost:3000/round/updateWinningNumber/${selectedRoundId}`,
        {
          winningNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch the updated data after updating the winning number
      const updatedData = await axios.get(
        `http://localhost:3000/round/getRounds?status=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(updatedData.data);
      setShowModal(false);
      setWinningNumber("");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error updating winning number:", error);
      setErrorMessage("Error updating winning number. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to</h1>
        <h2 className="text-3xl font-semibold text-blue-500">Digit Draw</h2>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between mb-4">
          <div>
            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabClick("active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "ended"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTabClick("ended")}
            >
              Ended
            </button>
          </div>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleCreateRound}
          >
            Create Round
          </button>
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <div className="bg-white p-4 rounded-b-lg shadow-md">
          {data.length > 0 ? (
            activeTab === "active" ? (
              <table className="min-w-full bg-white text-black border-collapse">
                <thead className="text-black">
                  <tr>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      ID
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Total Pot
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Status
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Round Start Time
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Round End Time
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.id}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.totalPot}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.status}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {new Date(item.roundStartTime).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.roundEndTime
                          ? new Date(item.roundEndTime).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleEndRound(item.id)}
                        >
                          End Round
                        </button>
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                          onClick={() => handleAddWinningNumber(item.id)}
                        >
                          Add Winning Number
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full bg-white text-black border-collapse">
                <thead className="text-black">
                  <tr>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      ID
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Round ID
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Winning Number
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Total Pot
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Payouts
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      User Contributions
                    </th>
                    <th className="py-2 px-4 border border-gray-300 text-black">
                      Payout Breakdown
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.id}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.roundId}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.winningNumber}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.totalPot}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.payouts &&
                        Object.keys(item.payouts).length > 0 ? (
                          Object.entries(item.payouts).map(([user, payout]) => (
                            <div key={user}>{`${user}: ${payout}`}</div>
                          ))
                        ) : (
                          <div>No payouts available</div>
                        )}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.userContributions &&
                        Object.keys(item.userContributions).length > 0 ? (
                          Object.entries(item.userContributions).map(
                            ([user, contribution]) => {
                              const percentage = (
                                (contribution / item.totalPot) *
                                100
                              ).toFixed(2);
                              return (
                                <div
                                  key={user}
                                >{`${user}: ${contribution} (${percentage}%)`}</div>
                              );
                            }
                          )
                        ) : (
                          <div>No contributions available</div>
                        )}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-black">
                        {item.userContributions &&
                        Object.keys(item.userContributions).length > 0 ? (
                          Object.entries(item.userContributions).map(
                            ([user, contribution]) => {
                              const payout =
                                (contribution / item.totalPot) * item.totalPot;
                              return (
                                <div key={user}>{`${user}: ${payout.toFixed(
                                  2
                                )}`}</div>
                              );
                            }
                          )
                        ) : (
                          <div>No contributions available</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            <p className="text-center text-black">No data found</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add Winning Number</h2>
            <input
              type="number"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
              value={winningNumber}
              onChange={(e) => setWinningNumber(e.target.value)}
              placeholder="Enter winning number"
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
                onClick={handleUpdateWinningNumber}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
