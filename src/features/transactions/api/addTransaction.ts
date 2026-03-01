import { supabase } from "../../../lib/supabase";

type AddTransactionParams = {
  amount: string;
  date?: string;
  categoryId: string;
  paymentMethodId: string;
  accountId: string;
  memo?: string;
};

export async function addTransaction({
  amount,
  date,
  categoryId,
  paymentMethodId,
  accountId,
  memo,
}: AddTransactionParams) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("ユーザー情報の取得に失敗しました。");
    return;
  }

  const payload: {
    user_id: string;
    amount: number;
    date?: string;
    category_id: string;
    payment_method_id: string;
    account_id: string;
    memo: string | null;
  } = {
    user_id: user.id,
    amount: Number(amount),
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    account_id: accountId,
    memo: memo || null,
  };
  if (date) {
    payload.date = date;
  }

  const { error } = await supabase.from("transactions").insert([payload]);

  if (error) {
    throw error;
  }
}
