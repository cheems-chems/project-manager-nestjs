import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/tasks">Taskc</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;