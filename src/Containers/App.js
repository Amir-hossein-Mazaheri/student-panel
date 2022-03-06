import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { Spin } from "antd";
import Wrapper from "../Layouts/Wrapper";

// layout assets
import MainLayout from "../Layouts/MainLayout";

// pages
import HomePage from "../Pages";
import NotFoundPage from "../Pages/Error/404";

const Exam = lazy(() => import("../Pages/Exam"));
const ExamResult = lazy(() => import("../Pages/ExamResult"));

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
          <Route element={<MainLayout asRoute={true} />}>
            <Route index element={<HomePage />} />
            <Route path="/exam/:id" element={<Exam />} />
            <Route path="/exam-result/:id" element={<ExamResult />} />
            <Route path="*" component={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
