import { Sidebar } from "../../components/SideBar/SideBar";
import { AppRoutes } from "../../routes/AppRoutes";

function Home() {

  return (
    <>
      <Sidebar items={
        [
          {
            pageTitle: "Home",
            text: "Home",
            icon: "home",
            url: AppRoutes.home
          },
          {
            pageTitle: "Settings",
            text: "Settings",
            icon: "settings",
            url: AppRoutes.home
          }
        ]
      }/>
    </>
  );
}

export default Home;