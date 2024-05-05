import { Post, PostWithCategory } from "@/types";
import PostCard from "./Post-card";

type Props = {
    posts: PostWithCategory[];
}

const PostList = ({ posts }: Props) => {
   if (!posts) {
     // Vérifie si posts est défini
     return <div>Aucun post disponible</div>;
   }
  return <div
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
  >{posts.map((item : PostWithCategory) => (
   <PostCard key={item.id} data={item} />

))}
  </div>;
};
export default PostList