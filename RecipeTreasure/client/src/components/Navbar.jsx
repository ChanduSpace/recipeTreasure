import React, { useEffect, useState } from "react";
import { Avatar, Modal, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, NavLink } from "react-router";
import api from "../api";

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/user/profile");
        setProfile(data.user);
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <h1>loading....</h1>;
  }

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    console.log("User logged out");
    setIsModalVisible(false);
  };

  return (
    <>
      <header className="!bg-[#EFC81A] h-17 w-full flex justify-around items-center top-0 fixed z-10">
        <div>
          <ul className="flex gap-16">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-[#EFC81A] rounded-md p-1.5"
                    : "text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-menu"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-[#EFC81A] rounded-md p-1.5"
                    : "text-black"
                }
              >
                Add Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-[#EFC81A] rounded-md p-1.5"
                    : "text-black"
                }
              >
                Search Menu
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 text-black items-center">
          <NavLink to="/profile">
            {profile.profilePicture ? (
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={profile.profilePicture}
                alt="profile"
              />
            ) : (
              <Avatar size="large" icon={<UserOutlined />} />
            )}
          </NavLink>

          <div>
            <NavLink to="/profile">
              <p>{profile.name}</p>
            </NavLink>

            <button
              onClick={showLogoutModal}
              className="text-sm underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center space-y-4">
            <p className="text-lg font-semibold text-[#EFC81A]">
              Are you sure Logout?
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Button
                onClick={handleCancel}
                className="!text-[#EFC81A] !border-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                className="!bg-red-600 !text-white !border-none"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
