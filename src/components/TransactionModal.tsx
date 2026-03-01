import type { Transaction } from "../features/transactions/types";

import TransactionForm from "./TransactionForm";

type TransactionModalProps = {
  editingTransaction?: Transaction | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionModal({
  editingTransaction = null,
  setIsOpen,
}: TransactionModalProps) {
  return (
    <> 
      <div className="overlay">
        <div className="modal-content">
          <h2>家計簿入力</h2>

          <TransactionForm
            editingTransaction={editingTransaction}
            onSaved={() => setIsOpen(false)}
          />

          <button onClick={() => setIsOpen(false)}>キャンセル</button>
        </div>
      </div>
    </>
  );
}
