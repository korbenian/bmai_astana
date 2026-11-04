import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Создаем и экспортируем единый клиент для работы с базой
export const supabase = createClient(supabaseUrl, supabaseAnonKey)