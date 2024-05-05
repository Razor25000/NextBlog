"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ProfileButton = () => {
  const { data: session, status } = useSession();
  if (!session) {
    return (
      <Link href="/login" className="w-auto">
        <Button className="text-sm px-4 py-2">Se connecter</Button>
      </Link>
    );
  }

  const onLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user?.image || "/img/shadcn_avatar.jpg"} />
          <AvatarFallback>{session.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={onLogout} className="cursor-pointer">
        Se déconnecter
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileButton;
