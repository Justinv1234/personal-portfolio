import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetailsPage";
import ContactMePage from "./pages/ContactMePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AddProjectPage from "./pages/AddProjectPage";
import EditProjectPage from "./pages/EditProjectPage";
import AddTimelineEventPage from "./pages/AddTimelineEventPage";
import EditTimelineEventPage from "./pages/EditTimelineEventPage";
import NotFound from "./pages/NotFoundPage";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/contact-me" element={<ContactMePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/projects/new" element={<AddProjectPage />} />
            <Route
              path="/admin/projects/edit/:id"
              element={<EditProjectPage />}
            />

            <Route
              path="/admin/timeline/new"
              element={<AddTimelineEventPage />}
            />
            <Route
              path="/admin/timeline/edit/:id"
              element={<EditTimelineEventPage />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
