import { getUser } from "@/hooks/getArticles";
import { useRouter } from "next/router";

export default function Product({ user }: any) {

    const { query } = useRouter();
    query
    return (
        <>
            <div>Product with id page</div>
            <div>{user.name}</div>
            <div>{user.city}</div>
        </>
    )
};

export async function getServerSideProps({ params }: any) {
    console.log('params', params);

    const data = await getUser(params.id);
    console.log('data', data);



    return {
        props: {
            user: data.user
        }
    }
}