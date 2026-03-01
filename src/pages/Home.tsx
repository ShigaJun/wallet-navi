import TransactionForm from "../components/TransactionForm";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <h2>スマート入力</h2>
      <TransactionForm 
        onSaved={() => alert("保存されました")} // 後のちアラートではなくする予定
      />
    </>
  );
}
