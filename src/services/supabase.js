import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sfomcnwajwguvmfejozn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb21jbndhandndXZtZmVqb3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NjI5OTcsImV4cCI6MjAxMDAzODk5N30.5_aTtE4-X3cL1EtZLBtIuqfnNaOJ2uI8NxPqvVkP9hE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
