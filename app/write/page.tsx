"use client";
import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hook/useCategories";
import { Category, Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import axios from "axios";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const WritePost = () => {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File>();
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);
  const router = useRouter();
  const createPost = (newPost: Partial<Post>) =>
    axios.post("/api/posts", newPost).then((res) => res.data);
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data: Post) => {
      router.push(`/posts/${data.slug}`);
    },
  });

  const { data: categories, isFetching } = useCategories();
  const { data: session } = useSession();
  useLayoutEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }
  }, [router, session]);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }
    const image = await uploadImage();
    console.log("image is : ", image);

    if (title !== "" && content !== "" && catSlug !== "" && image) {
      await mutate({
        title,
        content,
        catSlug,
        slug: slugify(title),
        image: image,
      });
    }
  };
  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      setFile(files[0]);
      const objectUrl = URL.createObjectURL(files[0]);
      setImageObjectUrl(objectUrl);
    }
  };

  const uploadImage = async () => {
    try {
      if (!file) return;

      const data = new FormData();
      data.set("file", file);

      const response = await axios.post("/api/upload", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error in uploadImage: ", error.response?.data);
      } else {
        console.error("Unexpected error in uploadImage: ", error);
      }
    }
  };
  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a Post" />
        <div className="mb-6">
          {imageObjectUrl && (
            <div className="relative size-40 mx-auto mb-2">
              <Image
                src={imageObjectUrl}
                layout="fill"
                objectFit="contain"
                alt="image"
              />
            </div>
          )}
          <Input type="file" onChange={onChangeFile} />
        </div>
        <Input
          placeholder="Title"
          type="text"
          className="mb-6"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {isFetching ? (
          <p>Loading categories</p>
        ) : (
          <Select onValueChange={(val) => setCatSlug(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
              <SelectContent>
                {categories?.map((category: Category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
        )}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="mt-6"
        />
        <Button disabled={isLoading} className="mt-6" onClick={handleSubmit}>
          {isLoading ? "Creating..." : "Publish"}
        </Button>
      </div>
    </PageContainer>
  );
};
export default WritePost;
