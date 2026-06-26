import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

function AppLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <>
            <Header
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {children}
        </>
    );

}

export default AppLayout;