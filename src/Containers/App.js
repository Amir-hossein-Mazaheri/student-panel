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
    <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  </Wrapper>
);

function App() {
  return (
    <Suspense fallback={loadingSpinner}>
      <BrowserRouter basename="student-panel">
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
