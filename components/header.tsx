
import Link from "next/link";
import ProfileButton from "./Profile-button";
import ResponsiveMenu from "./Responsive-menu";
import { HeaderNavigation } from "./header-navigation";
import PageContainer from "./page-container";
import ToogleTheme from "./ui/toggle-theme";


const Header = () => {
  return (
    <header className=" border-b">
      <PageContainer>
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-2">
            <ResponsiveMenu />

            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              <Link href="/">NextBlog</Link>
            </h1>
          </div>
          <HeaderNavigation />
          <div className="flex items-center gap-2">
            <ToogleTheme />
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
};
export default Header;
