import { useState } from "react";
import { addTransaction } from "../features/transactions/addTransaction";

type TransactionModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionModal({ setIsOpen }: TransactionModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [categoryId, setCategoryId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = async () => {
    try {
      await addTransaction({
        amount,
        date,
        categoryId,
        paymentMethodId,
        accountId,
        memo,
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("取引の追加に失敗しました。");
    }
  };

  return (
    <div className="overlay">
      <div className="modal-content">
        <h2>家計簿入力</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="金額"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="カテゴリID"
        />

        <input
          value={paymentMethodId}
          onChange={(e) => setPaymentMethodId(e.target.value)}
          placeholder="支払方法ID"
        />

        <input
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="口座ID"
        />

        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="メモ (任意)"
        />

        <button onClick={handleSubmit}>保存</button>
        <button onClick={() => setIsOpen(false)}>キャンセル</button>
      </div>
    </div>
  );
}
