"use client"
import PageContainer from "@/components/page-container";
import PostList from "@/components/posts-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hook/useCategories";
import { usePosts } from "@/hook/usePosts";
import { Category } from "@prisma/client";



import Link from "next/link";

export default function Home() {
  const {data : posts, isFetching} = usePosts()
  const {data : categories} = useCategories()

  if (!categories) {
    // Vérifie si posts est défini
    return <div>Aucun catégories disponible</div>;
  }
  return (
    <PageContainer>
      <div className="py-10 ">
        <div
          style={{ backgroundImage: "url(/img/dev.jpg" }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="font-bold text-center text-3xl sm:text-5xl text-black dark:text-white ">
                Devenez Un Meilleur Développeur React
              </h1>

              <Input
                type="email"
                placeholder="Email"
                className="dark: bg-white mt-4"
              />
              <Button className="w-full py-6 text-xl mt-4">
                Inscrivez-vous à notre newsletter
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center ">
          {categories.map((category: Category) => (
            <Button
              key={category.id}
              className="w-full py-6 text-xl mt-4 md:mx-2"
              variant="outline"
            >
              <Link href={`/categories/${category.slug}`}>{category.title}</Link>
            </Button>
          ))}
        </div>
        <PostList posts={posts} />
      </div>
    </PageContainer>
  );
}





