import { db } from "@/db";
import { users as usersTable } from "@/db/schema/users";

export default async function Home() {
    const posts = await db.select().from(usersTable);
    return <div className="pt-24 text-center">lorem</div>;
}
