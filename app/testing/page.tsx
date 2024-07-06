import Profile from "@/components/utility/Profile";
import { getUserData } from "../action";

export default async function page() {
    const userData2 = await getUserData({ username: "t-vaibhav" });
    console.log(userData2);
    return (
        <div className="pt-24">
            <Profile userData={userData2} />
        </div>
    );
}
