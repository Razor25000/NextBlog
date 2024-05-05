import { PostWithCategory } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Eye, MessageCircle } from "lucide-react";

type Props = {
  data: PostWithCategory;
};
const PostCard = ({ data }: Props) => {
  return (
    <Link href={`/posts/${data.slug}`}>
      <Card className="flex flex-col justify-between rounded-lg border-2 h-[100%]">
        <CardHeader>
          <div className="aspect-square relative">
            <Image
              src={data.image|| "/img/dev.jpg"}
              alt={data.title}
              fill
              className="aspect-square object-cover transition-all duration-300 hover:scale-110"
            />
          </div>
          <p className="font-semibold text-lg mt-3">{data.title}</p>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{data.cat.title}</Badge>
         
        </CardContent>
        <CardFooter>
            <div className="flex items-center gap-1 p-2">
                <MessageCircle size={20} className="text-slate-500"/>
                <p className="text-color-slate-500" >{data.nbComments}</p>

            </div>
            <div className="flex items-center gap-1">
                <Eye size={20} className="text-slate-500"/>
                <p className="text-color-slate-500" >{data.view}</p>

            </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default PostCard;
