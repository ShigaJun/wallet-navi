// 画面表示用のトランザクション型定義
export type Transaction = {
  id: string;
  date: string;
  amount: number;
  memo: string | null;
  categoryName: string;
  paymentMethodName: string;
  accountName: string;
};