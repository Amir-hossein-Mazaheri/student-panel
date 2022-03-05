import { Outlet } from "react-router";
import ContentLayout from "./ContentLayout";

function MainLayout({ asRoute = false, children }) {
  return (
    <main className="flex overflow-hidden">
      <aside className="basis-3/12 grow h-screen bg-black text-white">
        <div className="bg-green-500 font-semibold text-lg text-center px-5 py-5">
          <p>
            <span>خوش آمدی</span> <span>{"سید"}</span>
          </p>
        </div>
      </aside>
      <section className="basis-9/12 h-screen grow overflow-auto scrollbar-thin scrollbar-thumb-slate-700">
        <ContentLayout>{asRoute ? <Outlet /> : children}</ContentLayout>
      </section>
    </main>
  );
}

export default MainLayout;
