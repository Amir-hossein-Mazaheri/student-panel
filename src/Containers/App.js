import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Spin } from "antd";
import Wrapper from "../Layouts/Wrapper";

// pages
import HomePage from "../Pages";
import NotFoundPage from "../Pages/Error/404";

const Page1 = lazy(() => import("../Pages/Page1"));
const Page2 = lazy(() => import("../Pages/Page2"));

const loadingSpinner = (
  <Wrapper>
    <Spin />
  </Wrapper>
);

function App() {
  return (
    <Suspense fallback={loadingSpinner}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="*" component={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
