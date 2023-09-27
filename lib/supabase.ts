import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE: string = process.env.SUPABASE_SERVICE || "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE);
