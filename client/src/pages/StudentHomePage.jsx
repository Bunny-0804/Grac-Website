import React from 'react';
import '../styles/StudentHomePage.css';

// Placeholder icons (You can replace these with react-icons later)
const BellIcon = () => <span style={{fontSize: '1.2rem'}}>🔔</span>;
const UserIcon = () => <div className="user-avatar-placeholder"></div>;

function StudentHome() {
  return (
    <div className="dashboard-container">
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="dashboard-header">
        <div className="header-left">
            {/* Reusing your logo style */}
            <div className="dash-logo">GR<span className="logo-accent">A</span>C</div>
        </div>
        
        <nav className="header-nav">
            <a href="#" className="nav-link active">Home</a>
            <a href="#" className="nav-link">Projects</a>
            <a href="#" className="nav-link">Resources</a>
            <a href="#" className="nav-link">Profile</a>
        </nav>

        <div className="header-right">
            <button className="icon-btn"><BellIcon /></button>
            <span className="user-name">Jeevan (Member)</span>
            <UserIcon />
        </div>
      </header>

      {/* --- MAIN DASHBOARD GRID --- */}
      <main className="dashboard-content">
        
        {/* ROW 1: Projects (Wide) + Attendance + Resources */}
        
        {/* Card 1: My Projects (Spans 2 columns) */}
        <div className="dash-card card-projects">
            <div className="card-header">
                <h3>My Projects</h3>
                <button className="view-all-btn">View All</button>
            </div>
            <div className="card-body">
                <div className="list-item">
                    <div className="item-icon">🤖</div>
                    <div className="item-details">
                        <span className="item-title">Autonomous Drone</span>
                        <div className="progress-bar"><div className="fill" style={{width: '70%'}}></div></div>
                    </div>
                </div>
                <div className="list-item">
                    <div className="item-icon">🧠</div>
                    <div className="item-details">
                        <span className="item-title">AI Chatbot</span>
                        <div className="progress-bar"><div className="fill" style={{width: '30%'}}></div></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Card 2: Attendance */}
        <div className="dash-card card-attendance">
            <div className="card-header">
                <h3>Attendance</h3>
            </div>
            <div className="attendance-circle">
                <span className="percent">85%</span>
                <span className="label">Present</span>
            </div>
        </div>

        {/* Card 3: My Resources */}
        <div className="dash-card card-resources">
            <div className="card-header">
                <h3>My Resources</h3>
            </div>
            <div className="card-body">
                <div className="resource-item">📄 Python Guide.pdf</div>
                <div className="resource-item">🎥 Workshop Recording</div>
                <div className="resource-item">🔗 GitHub Repo</div>
            </div>
        </div>

        {/* ROW 2: Achievements + Skills (50/50 Split) */}

        {/* Card 4: Achievements */}
        <div className="dash-card card-achievements">
            <div className="card-header">
                <h3>Achievements & Certificates</h3>
            </div>
            <div className="card-body">
                 <div className="certificate-badge">
                    <span>🏆</span> Best Hackathon Project 2025
                 </div>
                 <div className="certificate-badge">
                    <span>📜</span> Python Advanced Certification
                 </div>
            </div>
        </div>

        {/* Card 5: Skill Development */}
        <div className="dash-card card-skills">
            <div className="card-header">
                <h3>Skill Development</h3>
            </div>
            <div className="skills-cloud">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Robotics</span>
                <span className="skill-tag">React</span>
            </div>
        </div>

      </main>
    </div>
  );
}

export default StudentHome;