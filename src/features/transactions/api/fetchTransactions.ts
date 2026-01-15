import { supabase } from "../../../lib/supabase";
import type { Transaction } from "../types";

export async function fetchTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
        id,
        date,
        amount,
        memo,
        categories(name),
        payment_methods(name),
        accounts(name)
    `
    )
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) return [];

  return data.map((row) => ({
    id: row.id,
    date: row.date,
    amount: row.amount,
    memo: row.memo ?? "",
    categoryName: row.categories.name ?? "",
    paymentMethodName: row.payment_methods.name ?? "",
    accountName: row.accounts.name ?? "",
  }));
}
