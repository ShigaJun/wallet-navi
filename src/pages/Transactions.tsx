import { useState } from "react";

import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h1>Transactions</h1>

      {/* 入力ボタン */}
      <button onClick={() => setIsOpen(true)}>家計簿入力</button>

      {/* 入力モーダル */}
      {isOpen && <TransactionModal setIsOpen={setIsOpen} />}

      {/* 取引履歴 */}
    </>
  );
}
