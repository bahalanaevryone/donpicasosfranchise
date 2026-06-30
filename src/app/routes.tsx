import { createBrowserRouter, Outlet } from "react-router";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import FranchisePage from "./pages/FranchisePage";
import FranchisePackagePage from "./pages/FranchisePackagePage";
import BranchesPage from "./pages/BranchesPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OpportunityApplicationPage from "./pages/OpportunityApplicationPage";
import MemberPortalPage from "./pages/MemberPortalPage";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function RootRoute() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootRoute,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "franchise",
        Component: FranchisePage,
      },
      {
        path: "franchise/:packageSlug",
        Component: FranchisePackagePage,
      },
      {
        path: "branches",
        Component: BranchesPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        // DITO MO PINALITAN: Binago natin mula sa "/admin" patungo sa sikretong link na ito
        path: "portal-don-picaso-secret-2026",
        Component: AdminDashboard,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "apply",
        Component: OpportunityApplicationPage,
      },
      {
        path: "portal",
        Component: MemberPortalPage,
      },
    ],
  },
]);
