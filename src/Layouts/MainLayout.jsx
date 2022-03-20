import { useCallback } from "react";
import { Outlet } from "react-router";
import Button from "../Common/Button";
import ContentLayout from "./ContentLayout";
import Auth from "../Helpers/Auth";
import useSWR from "swr";
import fetcher from "../Helpers/fetcher";
import Spinner from "../Common/Spinner";

function MainLayout({ asRoute = false, children }) {
  const { data: userInfo } = useSWR("/user/", fetcher);
  const logOut = useCallback(() => {
    Auth.logout();
    window.location.replace("http://lapluse.ir/exam-login/");
  }, []);

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <main className="flex overflow-hidden">
      <aside className="basis-3/12 pb-5 grow h-screen flex flex-col justify-between bg-black text-white">
        <div className="bg-green-500 font-semibold text-lg text-center px-5 py-5">
          <p>
            <span>خوش آمدی</span>{" "}
            <span>{userInfo.first_name + userInfo.last_name}</span>
          </p>
        </div>

        <div className="px-5">
          <Button
            onClick={logOut}
            className="bg-red-500 text-white w-full py-3"
          >
            <span>خروج</span>
          </Button>
        </div>
      </aside>
      <section className="basis-9/12 h-screen grow overflow-auto scrollbar-thin scrollbar-thumb-slate-700">
        <ContentLayout>{asRoute ? <Outlet /> : children}</ContentLayout>
      </section>
    </main>
  );
}

export default MainLayout;
