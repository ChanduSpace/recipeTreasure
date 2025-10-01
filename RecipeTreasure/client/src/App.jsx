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
import Feed from "./pages/Feed";

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
          <Route path="/category/:category" element={<Category />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/search" element={<Search />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-menu/:id" element={<EditMenu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
