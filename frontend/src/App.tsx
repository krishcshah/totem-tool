import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { SelectedFileContext } from "./contexts/SelectedFileContext";
import "./styles/app.css";
import { DashboardProvider } from "./contexts/DashboardContext";
import { Toaster } from "sonner";
import { SplashAnimation } from "./components/SplashAnimation";
import { setBypassCache } from "./interceptors/axios";
import { getUserSettings } from "./api/settingsApi";

const LOCAL_MODE = Boolean(import.meta.env.VITE_LOCAL_MODE);

// Code-split routes: the public landing page loads immediately without heavy analysis visualizers
const LandingPage = React.lazy(() => import("./landing/LandingPage"));
const ProcessOverview = React.lazy(() =>
  import("./ProcessOverview").then((m) => ({ default: m.ProcessOverview }))
);
const UploadView = React.lazy(() => import("./UploadView"));
const DeleteView = React.lazy(() =>
  import("./DeleteView").then((m) => ({ default: m.DeleteView }))
);
const SettingsView = React.lazy(() =>
  import("./SettingsView").then((m) => ({ default: m.SettingsView }))
);
const Login = React.lazy(() =>
  import("./react_component/login").then((m) => ({ default: m.Login }))
);
const Logout = React.lazy(() =>
  import("./react_component/logout").then((m) => ({ default: m.Logout }))
);

async function guestLogin() {
  const { data } = await axios.post(
    "/token/",
    { username: "Guest", password: "guest" },
    // Never let a 401 from the login itself trigger the refresh interceptor.
    { _skipAuthRefresh: true }
  );
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
  localStorage.setItem("access_token", data.access);
  if (data.refresh) localStorage.setItem("refresh_token", data.refresh);
}

function AppRoutes({ selectedFile, setSelectedFile }: any) {
  const location = useLocation();
  const [ready, setReady] = useState(!LOCAL_MODE);
  // Splash plays on every mount — including dev — until dismissed. Press Esc
  // or click anywhere to skip.
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = () => {
    setSplashDone(true);
  };

  // Do not obscure the marketing landing page with the blocking app splash
  const isLandingRoute = location.pathname === "/" || location.pathname === "/title";

  useEffect(() => {
    if (!LOCAL_MODE) return;
    let cancelled = false;
    (async () => {
      // Retry only while the backend is unreachable (Electron may open the
      // window before Django finishes booting). Stop immediately on any HTTP
      // response — a 401 means the Guest user/password is wrong in the DB,
      // and retrying won't fix that.
      for (let attempt = 0; attempt < 20 && !cancelled; attempt++) {
        try {
          if (!localStorage.getItem("access_token")) {
            await guestLogin();
          } else {
            axios.defaults.headers.common["Authorization"] =
              `Bearer ${localStorage.getItem("access_token")}`;
          }
          if (!cancelled) setReady(true);
          return;
        } catch (err: any) {
          if (err?.response) {
            console.error(
              "Guest auto-login rejected by backend. Is the Guest user seeded " +
                "with password 'guest'? Run `node scripts/run-python.js " +
                "backend/manage.py migrate` and try again."
            );
            if (!cancelled) setReady(true);
            return;
          }
          await new Promise((r) => setTimeout(r, 500));
        }
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Seed the global cache-bypass flag from the user's saved setting once we're
  // authenticated. Guarded on an access token so we don't fire (and trigger a
  // login redirect) on the pre-auth title/login screens.
  useEffect(() => {
    if (!ready) return;
    if (!localStorage.getItem("access_token")) return;
    getUserSettings()
      .then((s) => setBypassCache(s.bypass_cache))
      .catch(() => {
        /* not logged in yet or settings unavailable — leave bypass off */
      });
  }, [ready]);

  if (!ready) {
    return (
      <div className="website-background">
        <div className="flex items-center justify-center h-dvh" />
      </div>
    );
  }

  return (
    <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
      <DashboardProvider>
        <div className={isLandingRoute ? "w-full min-h-screen bg-[#F7F7F2]" : "website-background"}>
          <Toaster position="top-center" richColors />
          {!splashDone && !isLandingRoute && (
            <SplashAnimation onComplete={handleSplashComplete} />
          )}

          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[60vh] font-mono text-xs text-neutral-500">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route
                path="/title"
                element={LOCAL_MODE ? <Navigate to="/upload" replace /> : <LandingPage />}
              />
              <Route
                path="/login"
                element={LOCAL_MODE ? <Navigate to="/upload" replace /> : <Login />}
              />
              <Route path="/logout" element={<Logout />} />
              <Route path="/upload" element={<UploadView />} />
              <Route path="/overview" element={<ProcessOverview />} />
              <Route path="/userdatadelete" element={<DeleteView />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route
                path="/"
                element={
                  LOCAL_MODE ? (
                    <Navigate to="/upload" replace />
                  ) : (
                    <LandingPage />
                  )
                }
              />
            </Routes>
          </Suspense>
        </div>
      </DashboardProvider>
    </SelectedFileContext.Provider>
  );
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <AppRoutes selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
  );
}

export default App;
