import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUser, faUsers, faClipboardList, faFileAlt, faUserGraduate, faClipboardCheck, faCreditCard  } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./style.css";


// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Updated widgetData
const widgetData = [
  { title: "Total Students", value: 1, icon: faUser, color: "blue" },
  { title: "Total Staff", value: 2, icon: faUsers, color: "green" },
  { title: "Total Admissions", value: 3, icon: faClipboardList, color: "yellow" },
  { title: "Total Applications", value: 4, icon: faFileAlt, color: "red" },
];

// Widget component for cleaner JSX
// eslint-disable-next-line react/prop-types
const Widget = ({ title, value, icon, color }) => (
  <div className={`widget ${color}`}>
    <FontAwesomeIcon icon={icon} className="icon" />
    <h3>{title}</h3>
    <p>{value}</p>
    <button>
      More Info <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
);

// Dummy chart data
const barChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Attendance",
      data: [50, 73, 96, 125, 100],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const pieChartData = {
  labels: ["Students", "Staff"],
  datasets: [
    {
      label: "Population",
      data: [70, 30],
      backgroundColor: ["#4bc0c0", "#ff6384"],
    },
  ],
};

const pieChartOptions = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
  aspectRatio: 1.1, // Adjust this value to make it smaller
};

const Admin = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const handleCollapseToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const toggleForm = (form) => {
    setActiveForm(activeForm === form ? null : form);
  };

  const renderForm = (form) => {
    switch (form) {
      case "students":
        return (
          <div className="form-container">
            <button className="close-btn" onClick={() => toggleForm("students")}>
              X
            </button>
            <h3>Manage Students</h3>
            <form>
              <label>Search by Name:</label>
              <input type="text" placeholder="Enter student name" />
              <label>Student ID:</label>
              <input type="text" placeholder="Enter student ID" />
              <button type="submit">Search</button>
            </form>
          </div>
        );
      case "admissions":
        return (
          <div className="form-container">
            <button
              className="close-btn"
              onClick={() => toggleForm("admissions")}
            >
              X
            </button>
            <h3>Process Admissions</h3>
            <form>
              <label>Application ID:</label>
              <input type="text" placeholder="Enter application ID" />
              <label>Status:</label>
              <select>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case "fees":
        return (
          <div className="form-container">
            <button className="close-btn" onClick={() => toggleForm("fees")}>
              X
            </button>
            <h3>Track Fee Payments</h3>
            <form>
              <label>Student ID:</label>
              <input type="text" placeholder="Enter student ID" />
              <label>Amount Paid:</label>
              <input type="number" placeholder="Amount" />
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      case "reports":
        return (
          <div className="form-container">
            <button className="close-btn" onClick={() => toggleForm("reports")}>
              X
            </button>
            <h3>Generate Reports</h3>
            <form>
              <label>Select Report Type:</label>
              <select>
                <option value="student">Student Report</option>
                <option value="admission">Admission Report</option>
                <option value="fees">Fees Report</option>
              </select>
              <button type="submit">Generate</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`admin-dashboard ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <Sidebar
        role="admin"
        onCollapseToggle={handleCollapseToggle}
        isCollapsed={isSidebarCollapsed}
      />
      <div className="main-content">
        <h1>Admin Dashboard</h1>

        <div className="widgets">
          {widgetData.map((widget, index) => (
            <Widget
              key={index}
              title={widget.title}
              value={widget.value}
              icon={widget.icon}
              color={widget.color}
            />
          ))}
        </div>

        <hr />

        <div className="dashboard-links">
          <div className="card" onClick={() => toggleForm("students")}>
            <FontAwesomeIcon icon={faUserGraduate} size="2x" />
            <p>Manage Students</p>
          </div>
          <div className="card" onClick={() => toggleForm("admissions")}>
            <FontAwesomeIcon icon={faClipboardCheck} size="2x" />
            <p>Process Admissions</p>
          </div>
          <div className="card" onClick={() => toggleForm("fees")}>
            <FontAwesomeIcon icon={faCreditCard} size="2x" />
            <p>View Fee Payments</p>
          </div>
          <div className="card" onClick={() => toggleForm("reports")}>
            <FontAwesomeIcon icon={faFileAlt} size="2x" />
            <p>Generate Reports</p>
          </div>
        </div>

        {activeForm && renderForm(activeForm)}

        <br />
        <hr />
        <br />

        {/* Charts */}
        <div className="charts-container">
          <div className="chart-column">
            <div className="chart-heading">
              <span>Student Attendance</span>
              <button className="close-btn" onClick={() => console.log("Close Bar Chart")}>
                X
              </button>
            </div>
            <div className="chart-container">
              <Bar data={barChartData} />
            </div>
          </div>
          <div className="chart-column">
            <div className="chart-heading">
              <span>Staff vs Students</span>
              <button className="close-btn" onClick={() => console.log("Close Pie Chart")}>
                X
              </button>
            </div>
            <div className="chart-container">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
