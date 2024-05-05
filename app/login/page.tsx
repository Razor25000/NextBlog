"use client"


import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const onLogin = (provider: string) => () => {
    signIn(provider);
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Login or Register" />
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <Button onClick={onLogin("github")}>
            <Github size={20} className="mr-3" />
            Signin with Github
          </Button>
          <Button onClick={onLogin("google")}>
            <Mail size={20} className="mr-3" />
            Signin with Google
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
export default LoginPage;
