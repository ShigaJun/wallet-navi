import type { Transaction } from "../features/transactions/types";

import TransactionForm from "./TransactionForm";

type TransactionModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingTransaction: Transaction | null;
};

export default function TransactionModal({
  setIsOpen, 
  editingTransaction,
}: TransactionModalProps) {
  return (
    <> 
      <div className="overlay">
        <div className="modal-content">
          <h2>家計簿入力</h2>

          <TransactionForm
            editingTransaction={editingTransaction}
          />

          <button onClick={() => setIsOpen(false)}>キャンセル</button>
        </div>
      </div>
    </>
  );
}
