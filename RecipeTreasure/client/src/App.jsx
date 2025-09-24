import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginAndSignupPage from "./pages/LoginAndSignupPage";
import Home from "./pages/Home";
import AddMenu from "./pages/AddMenu";
import Search from "./pages/Search";
import RecipeDetails from "./pages/RecipeDetails";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import EditMenu from "./pages/EditMenu";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoginPage = true;

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginAndSignupPage page={isLoginPage} />}
        />
        <Route
          path="/register"
          element={<LoginAndSignupPage page={!isLoginPage} />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/edit-menu/:id" element={<EditMenu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
