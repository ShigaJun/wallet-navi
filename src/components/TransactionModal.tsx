import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import { getLocalToday } from "../utils/date";

import { addTransaction } from "../features/transactions/api/addTransaction";
import type { Transaction } from "../features/transactions/types";

import { fetchCategories } from "../features/categories/fetchCategories";
import type { Category } from "../features/categories/types";

import { fetchPaymentMethods } from "../features/payment_methods/fetchPaymentMethods";
import type { PaymentMethod } from "../features/payment_methods/types";

import { fetchAccounts } from "../features/accounts/fetchAccounts";
import type { Account } from "../features/accounts/types";

import { fetchCashPaymentMethod } from "../features/cashPaymentMethod/fetchCashPaymentMethod";

import Switch from "../components/Switch";

type TransactionModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingTransaction?: Transaction | null;
};

type FormState = {
  kind: "expense" | "income";
  amount: string;
  date: string;
  categoryId: string;
  paymentMethodId: string;
  accountId: string;
  memo: string;
};

export default function TransactionModal({
  setIsOpen,
  editingTransaction = null,
}: TransactionModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [form, setForm] = useState<FormState>({
    kind: "expense",
    amount: "0",
    date: getLocalToday(),
    categoryId: "",
    paymentMethodId: "",
    accountId: "",
    memo: "",
  });

  const [cashPaymentMethodId, setCashPaymentMethodId] = useState<string | null>(
    null
  );
  const filteredCategories = categories.filter((c) => c.type === form.kind);

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
    if (form.kind === "income") {
      if (cashPaymentMethodId) {
        setForm((prev) => ({ ...prev, paymentMethodId: cashPaymentMethodId }));
      }
    } else {
      setForm((prev) => ({ ...prev, paymentMethodId: "" }));
    }
  }, [form.kind, cashPaymentMethodId]);

  useEffect(() => {
    if (!editingTransaction) return;

    const category = categories.find(
      (c) => c.name === editingTransaction.categoryName
    );
    setForm({
      kind: category?.type || "expense",
      amount: String(editingTransaction.amount),
      date: editingTransaction.date,
      memo: editingTransaction.memo ?? "",
      categoryId:
        categories.find((c) => c.name === editingTransaction.categoryName)
          ?.id || "",
      paymentMethodId:
        paymentMethods.find(
          (p) => p.name === editingTransaction.paymentMethodName
        )?.id || "",
      accountId:
        accounts.find((a) => a.name === editingTransaction.accountName)?.id ||
        "",
    });
  }, [editingTransaction, categories, paymentMethods, accounts]);

  const handleSubmit = async () => {
    try {
      if (editingTransaction) {
        await supabase
          .from("transactions")
          .update({
            amount: form.amount,
            date: form.date,
            memo: form.memo,
            category_id: form.categoryId,
            payment_method_id: form.paymentMethodId,
            account_id: form.accountId,
          })
          .eq("id", editingTransaction.id);
      } else {
        await addTransaction({
          amount: form.amount,
          date: form.date,
          categoryId: form.categoryId,
          paymentMethodId: form.paymentMethodId,
          accountId: form.accountId,
          memo: form.memo,
        });
      }

      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert(
        editingTransaction
          ? "取引の更新に失敗しました。"
          : "取引の追加に失敗しました。"
      );
    }
  };

  return (
    <div className="overlay">
      <div className="modal-content">
        <h2>家計簿入力</h2>

        {/* 収入／支出切替スイッチ */}
        <Switch kind={form.kind} setKind={(kind) => setForm((prev) => ({ ...prev, kind }))} />

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={form.amount}
          placeholder="金額"
          onChange={(e) => {
            const value = e.target.value;

            // 全消しを許可
            if (value === "") {
              setForm((prev) => ({ ...prev, amount: "" }));
              return;
            }

            // 数字以外の文字を除去
            if (!/^\d+$/.test(value)) {
              alert("金額は正の整数のみ入力できます。");
              return;
            }

            setForm((prev) => ({ ...prev, amount: value }));
          }}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, date: e.target.value }))
          }
        />

        <select
          value={form.categoryId}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, categoryId: e.target.value }))
          }
        >
          <option value="">カテゴリを選択</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {form.kind === "expense" && (
          <select
            value={form.paymentMethodId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, paymentMethodId: e.target.value }))
            }
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
          value={form.accountId}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, accountId: e.target.value }))
          }
        >
          <option value="">口座を選択</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        <input
          value={form.memo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, memo: e.target.value }))
          }
          placeholder="メモ (任意)"
        />

        <button onClick={handleSubmit}>保存</button>
        <button onClick={() => setIsOpen(false)}>キャンセル</button>
      </div>
    </div>
  );
}
