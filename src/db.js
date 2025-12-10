import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

//Authentication
export const supabaseAuth = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

//CRUD + Realtime
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        realtime: { params: { eventsPerSecond: 10 } }
    }
)

console.log("Connected to Supabase successfully!");