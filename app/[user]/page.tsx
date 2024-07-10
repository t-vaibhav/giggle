import { getServerSession } from "next-auth";
import { getUserData } from "../action";
import { authOptions } from "@/utils/authOptions"; // Adjust the path as needed
import getAuthData from "@/utils/getAuthData";
import Display from "@/components/utility/Display";

export default async function Page({ params }: { params: { user: string } }) {
    const userData2 = await getUserData({ username: params.user });
    console.log(userData2);
    return <Display userData={userData2} user={params.user} />;
}
