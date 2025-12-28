type TransactionModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function TransactionModal({
  setIsOpen,
}: TransactionModalProps) {
  return (
    <>
      <div className="overlay">
        <div className="modal-content">
          <h2>家計簿入力</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </>
  );
}
