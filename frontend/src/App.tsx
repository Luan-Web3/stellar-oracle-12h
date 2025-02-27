import StellarSdk, { Horizon } from "@stellar/stellar-sdk";

import React, { useState, useEffect } from "react";

interface Balance {
  asset_type: string;
  balance: string;
}

function App() {
  const server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const publicKey =
        "GC2BKLYOOYPDEFJKLKY6FNNRQMGFLVHJKQRGNSSRRGSMPGF32LHCQVGF";

      try {
        const account: Horizon.AccountResponse = await server.loadAccount(
          publicKey
        );
        setBalances(account.balances);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Balances</h1>
      <ul>
        {balances.map((balance, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">Type:</span> {balance.asset_type},{" "}
            <span className="font-semibold">Balance:</span> {balance.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
