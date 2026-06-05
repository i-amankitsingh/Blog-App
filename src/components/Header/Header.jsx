import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header
        className="
sticky
top-0
z-50
bg-white/80
backdrop-blur-xl
border-b
border-gray-200
shadow-sm
"
      >
        <Container>
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <Logo width="100px" />

              <div>
                <h1 className="text-xl font-bold text-gray-900">CodeBlog</h1>

                <p className="text-xs text-gray-500">
                  Share ideas with the world
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.url)}
                      className="
              px-4
              py-2
              rounded-xl
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-100
              hover:text-black
              transition-all
              duration-200
            "
                    >
                      {item.name}
                    </button>
                  ),
              )}

              {authStatus && (
                <div className="ml-3 pl-3 border-l border-gray-200">
                  <LogoutBtn />
                </div>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}
