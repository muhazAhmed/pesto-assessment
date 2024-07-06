import { lazy, Suspense, useEffect } from "react";
import "./App.scss";
import Loader from "./components/Loading/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadServer } from "./utils/axios";

const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const PageNotFound = lazy(() => import("./components/pageNotFound/PageNotFound"));

function App() {
  useEffect(() => {
    loadServer();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
