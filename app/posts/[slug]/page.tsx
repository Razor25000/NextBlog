"use client";
import Comments from "@/components/comments";
import PageContainer from "@/components/page-container";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePost } from "@/hook/usePost";

import { Eye, MessageCircle } from "lucide-react";
import Image from "next/image";

const SinglePost = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: post, isFetching, error } = usePost(slug);

  if (isFetching) {
    return <PageContainer>Loading...</PageContainer>;
  }
  if (error) {
    return <PageContainer>Error</PageContainer>;
  }
  return (
    <PageContainer>
      <div className="p-8 ">
        <div className="relative rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center">
          <Image
            src={post?.image || "/img/dev.jpg"}
            alt={post?.title as string}
            fill
            objectFit="contain"
          />
          <div className="absolute h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="font-bold text-center text-3xl sm:text-5xl text-black dark:text-white ">
                {post?.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-3 mb-3">
          <div className="flex justify-center items-center gap-2">
            <Avatar>
              <AvatarImage src="/img/shadcn_avatar.jpg" alt="John ReactDev" />
            </Avatar>
            <div>
              {/* <p>{POST.author}</p> */}
              {post?.createdAt && (
                <p className="text-slate-500 text-sm">
                  Posted on {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <MessageCircle size={20} />
              <p className="text-color-slate-500">{post?.nbComments}</p>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={20} />
              <p>{post?.view}</p>
            </div>
          </div>
        </div>

        <Separator />
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: post?.content as string }}
        />
        <Comments postSlug={slug} />
      </div>
    </PageContainer>
  );
};
export default SinglePost;
