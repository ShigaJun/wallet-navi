import { supabase } from "../../lib/supabase";
import type { Account } from "./types";

export async function fetchAccounts(): Promise<Account[]> {
  const { data, error } = await supabase
    .from("accounts")
    .select("id, name")
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}