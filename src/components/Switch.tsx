export default function Switch({
  kind,
  setKind,
}: {
  kind: "income" | "expense";
  setKind: (kind: "income" | "expense") => void;
}) {
  return (
    <div className="kind-switch">
      <button
        type="button"
        className={kind === "expense" ? "active" : ""}
        onClick={() => setKind("expense")}
      >
        支出
      </button>

      <button
        type="button"
        className={kind === "income" ? "active" : ""}
        onClick={() => setKind("income")}
      >
        収入
      </button>
    </div>
  );
}
