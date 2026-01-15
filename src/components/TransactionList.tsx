import type { Transaction } from "../features/transactions/types";

type Props = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  if (transactions.length === 0) {
    return <p>取引履歴がありません。</p>;
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>日付</th>
          <th>金額</th>
          <th>メモ</th>
          <th>カテゴリ</th>
          <th>支払方法</th>
          <th>口座</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.date}</td>
            <td>{tx.amount}</td>
            <td>{tx.memo ?? ""}</td>
            <td>{tx.categoryName}</td>
            <td>{tx.paymentMethodName}</td>
            <td>{tx.accountName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
