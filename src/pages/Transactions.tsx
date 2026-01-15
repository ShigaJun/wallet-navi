import { useEffect, useState } from "react";
import { fetchTransactions } from "../features/transactions/api/fetchTransactions";
import { supabase } from "../lib/supabase";
import type { Transaction } from "../features/transactions/types";
import TransactionModal from "../components/TransactionModal";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    loadTransactions();
  }, [isOpen]);

  return (
    <>
      <h1>Transactions</h1>

      {/* 入力ボタン */}
      <button onClick={() => setIsOpen(true)}>家計簿入力</button>

      {/* 入力モーダル */}
      {isOpen && <TransactionModal setIsOpen={setIsOpen} />}

      {/* 取引履歴 */}
      <TransactionList transactions={transactions} />
    </>
  );
}
