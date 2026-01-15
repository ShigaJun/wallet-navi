import { useEffect, useState } from "react";
import { fetchTransactions } from "../features/transactions/api/fetchTransactions";
import { supabase } from "../lib/supabase";
import type { Transaction } from "../features/transactions/types";
import TransactionModal from "../components/TransactionModal";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

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
      {isOpen && <TransactionModal setIsOpen={setIsOpen} editingTransaction={editingTransaction} />}

      {/* 取引履歴 */}
      <TransactionList
        transactions={transactions}
        onEdit={(tx) => {
          setEditingTransaction(tx);
          setIsOpen(true);
        }}
        onDelete={async (tx) => {
          if (confirm("本当に削除しますか？")) {
            try {
              await supabase
                .from("transactions")
                .delete()
                .eq("id", tx.id);
              const updated = await fetchTransactions();
              setTransactions(updated);
            } catch (error) {
              console.error("Error deleting transaction:", error);
            }
          }
        }}
      />
    </>
  );
}
