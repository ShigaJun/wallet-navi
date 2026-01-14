import { supabase } from "../../lib/supabase";
import type { Category } from "./types";

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data ?? [];
}
