import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import CATEGORIES from "@/utils/categories";
import { Category } from "@/types";

const ResponsiveMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 cursor-pointer md:hidden" />
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col gap-2">
          <Link href="/write">
            <Button variant="ghost">Ecrire un article</Button>
          </Link>
          <p className="text-xl font-bold">Categories</p>
          {CATEGORIES.map((category: Category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block px-2 py-1 text-lg"
            >
              <Button variant="ghost">{category.name}</Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default ResponsiveMenu;
