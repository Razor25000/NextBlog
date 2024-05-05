"use client"
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import PostList from "@/components/posts-list";
import { usePosts } from "@/hook/usePosts";
import { POSTS } from "@/utils/posts";

type CategoriesPageProps = {
  params: {
    slug: string;
  };
};

const CategoriesPage = ({ params }: CategoriesPageProps) => {
  const { slug } = params;
  const { data: posts, isFetching } = usePosts(slug);
  return (
    <PageContainer>
      <div className="py-10 px-4">
        <PageTitle title={slug.replace("-", " ")} />

        {!isFetching && <PostList posts={posts} />}
      </div>
    </PageContainer>
  );
};
export default CategoriesPage;
