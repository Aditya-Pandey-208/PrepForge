import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({isSidebarOpen, setIsSidebarOpen}) {

    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        window.location.replace("/");
    };

    return (
        <header className="header">
            <div className="header-left">

                <button
                    className="menu-button"
                    onClick={() => setIsSidebarOpen(prev => !prev)}
                >
                    ☰
                </button>

                <Link to="/" className="logo">
                    PrepForge
                </Link>

            </div>

            <div className="header-right">

                {username ? (
                    <>
                        <span>{username}</span>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="login-button">
                            Login
                        </button>
                    </Link>
                )}

            </div>

        </header>
    );
}

export default Header;