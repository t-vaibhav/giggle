import PostContent from "@/components/utility/PostContent";
import { getExplorePostData } from "@/app/action";

export default async function Page({ params }: { params: { id: number } }) {
    const postId = params.id;
    const dataa = await getExplorePostData({ id: postId });
    console.log("dataa: ", dataa);

    return (
        <>
            <PostContent data={dataa.result} />
        </>
    );
}
