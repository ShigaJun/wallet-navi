import { useState, useEffect } from "react";
import { addTransaction } from "../features/transactions/addTransaction";

import Switch from "../components/Switch";

import type { Category } from "../features/categories/types";
import { fetchCategories } from "../features/categories/fetchCategories";
import type { PaymentMethod } from "../features/payment_methods/types";
import { fetchPaymentMethods } from "../features/payment_methods/fetchPaymentMethods";
import type { Account } from "../features/accounts/types";
import { fetchAccounts } from "../features/accounts/fetchAccounts";
import { fetchCashPaymentMethod } from "../features/cashPaymentMethod/fetchCashPaymentMethod";

type TransactionModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionModal({ setIsOpen }: TransactionModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [categoryId, setCategoryId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [memo, setMemo] = useState("");

  const [kind, setKind] = useState<"expense" | "income">("expense");
  const [cashPaymentMethodId, setCashPaymentMethodId] = useState<string | null>(
    null
  );
  const filteredCategories = categories.filter((c) => c.type === kind);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((error) => {
        console.error(error);
        alert("カテゴリの取得に失敗しました。");
      });
  }, []);

  useEffect(() => {
    fetchPaymentMethods()
      .then(setPaymentMethods)
      .catch((error) => {
        console.error(error);
        alert("支払方法の取得に失敗しました。");
      });
  }, []);

  useEffect(() => {
    fetchAccounts()
      .then(setAccounts)
      .catch((error) => {
        console.error(error);
        alert("口座の取得に失敗しました。");
      });
  }, []);

  useEffect(() => {
    const loadCashMethod = async () => {
      const id = await fetchCashPaymentMethod();
      setCashPaymentMethodId(id);
    };

    loadCashMethod();
  }, []);

  useEffect(() => {
    if (kind === "income") {
      if (cashPaymentMethodId) {
        setPaymentMethodId(cashPaymentMethodId);
      }
    } else {
      setPaymentMethodId("");
    }
  }, [kind, cashPaymentMethodId]);

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

        {/* 収入／支出切替スイッチ */}
        <Switch kind={kind} setKind={setKind} />

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

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">カテゴリを選択</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {kind === "expense" && (
          <select
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
          >
            <option value="">支払方法を選択</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        >
          <option value="">口座を選択</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

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
