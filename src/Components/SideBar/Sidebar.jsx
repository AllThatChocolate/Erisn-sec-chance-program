import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaBook, FaMoneyBill, FaBell, FaHandshake, FaArchive } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import "./style.css"; // Import updated CSS

const Sidebar = ({ role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar links based on role
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin", icon: <FaHome /> },
      { name: "Teachers", path: "/admin/teachers", icon: <FaUser /> },
      { name: "Students", path: "/admin/students", icon: <FaUser /> },
      { name: "Admissions", path: "/admin/admissions", icon: <FaArchive /> },
      { name: "Fees", path: "/admin/fees", icon: <FaMoneyBill /> },
      { name: "Behavior Tracking", path: "/admin/behavior", icon: <FaBell /> },
      { name: "Library", path: "/admin/library", icon: <FaBook /> },
      { name: "Sponsorship", path: "/admin/sponsorship", icon: <FaHandshake /> },
      { name: "Alumni", path: "/admin/alumni", icon: <FaUser /> },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
      { name: "Students", path: "/teacher/students", icon: <FaUser /> },
      { name: "Behavior Tracking", path: "/teacher/behavior", icon: <FaBell /> },
      { name: "Library", path: "/teacher/library", icon: <FaBook /> },
    ],
    student: [
      { name: "Dashboard", path: "/student", icon: <FaHome /> },
      { name: "Schedule", path: "/student/schedule", icon: <FaBook /> },
      { name: "Fees", path: "/student/fees", icon: <FaMoneyBill /> },
      { name: "Library", path: "/student/library", icon: <FaBook /> },
    ],
  };

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {/* Logo and Company Name */}
        <div className="logo">
          <FontAwesomeIcon icon={faUserGraduate} size="2x" />
        </div>
        {/* Sidebar Collapse Button */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? "➤" : "◀"}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="sidebar-links">
        {links[role].map((link, index) => (
          <li key={index}>
            <Link to={link.path} data-tooltip={link.name}>
              {link.icon}
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  role: PropTypes.oneOf(["admin", "teacher", "student"]).isRequired,
};

export default Sidebar;
