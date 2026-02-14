import Post from "../components/Post";
import {useQuery} from '@tanstack/react-query';
import Loading from "../components/Loading";

const api = "http://localhost:8800/posts";

export default function Home(){
    const {data: posts, isLoading, isError} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch(api);
            return res.json();
        }

    });

    if(isLoading){
        return <Loading />
    }

    if(isError){
        return <h1>Error...</h1>
    }


    return(
        <div className=" flex flex-col w-full max-w-2xl mx-auto gap-2 py-8 px-2">
            {posts.map((post)=> {
                return <Post key={post.id} post={post}/>
            })}
            
        </div>
    );
}