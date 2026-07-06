import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: "📊"
    },
    {
        name: "DSA",
        path: "/dsa",
        icon: "💻"
    },
    {
        name: "Development",
        path: "/development",
        icon: "🌐"
    },
    {
        name: "Subjects",
        path: "/subject",
        icon: "📚"
    }
];

const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    window.location.replace("/");
};

function Sidebar({
    isSidebarOpen, 
    setIsSidebarOpen
}) {

    const username = localStorage.getItem("username");
    return (
        <>
            {isSidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <aside
                className={`sidebar ${
                    isSidebarOpen ? "open" : ""
                }`}
            >

                {
                    menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            {item.icon}{item.name}
                        </NavLink>

                    ))
                }

                {username && (
                    <div className="sidebar-user">
                        <div className="sidebar-username">
                             <span>👤</span>
                             <span>{username}</span>
                        </div>

                        <button
                            className="sidebar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

export default Sidebar;