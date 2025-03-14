import { createClient } from "../../utils/supabase/server";

export default async function Notes() {
    const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: notes } = await supabase.from("notes").select();

    return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
