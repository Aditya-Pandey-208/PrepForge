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
        path: "/subjects",
        icon: "📚"
    },
    {
        name: "Leaderboard",
        path: "/leaderboard",
        icon: "🏆"
    }
];

function Sidebar({
    isSidebarOpen, 
    setIsSidebarOpen
}) {
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
            </aside>
        </>
    );
}

export default Sidebar;