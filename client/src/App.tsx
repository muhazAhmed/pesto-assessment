import { lazy, Suspense } from "react";
import "./App.scss";
import Loader from "./components/Loading/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const PageNotFound = lazy(() => import("./components/pageNotFound/PageNotFound"));

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
