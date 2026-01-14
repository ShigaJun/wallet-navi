import { supabase } from "../../lib/supabase";
import type { PaymentMethod } from "./types";

export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("id, name")
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}