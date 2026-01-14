import { supabase } from "../../lib/supabase";

export async function fetchCashPaymentMethod() {
  const { data, error } = await supabase
    .from("payment_methods")
    .select("id")
    .eq("name", "現金")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}
