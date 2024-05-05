import CATEGORIES from "@/utils/categories";
import PageContainer from "./page-container";
import Link from "next/link";
import { Category } from "@/types";
import { Button } from "./ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="p-4 border-t">
      <PageContainer>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            NextBlog
          </h1>
          <div className="flex gap-2">Copyright © 2024</div>
          <div className="flex gap-2">
            <Instagram />
            <Facebook />
            <Youtube />
            <Linkedin />

          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
export default Footer;
