import '../styles/HeroShowcase.css'; // Assuming your CSS is here

// Placeholder components for icons - replace with your actual icon library (e.g., react-icons)
const ArrowRightIcon = () => <span>→</span>;
const RoboticsIcon = () => <span>🤖</span>;
const AiMlIcon = () => <span>🧠</span>;
const InnovationIcon = () => <span>🚀</span>;
const LabIcon = () => <span>🏛️</span>;
const ProjectIcon = () => <span>⚙️</span>;

function HeroShowcase() {
  return (
    <div className="hero_showcase">
      {/* Left Column: Text Content */}
      <div className="hero_content">
        <p className="hero_subtitle">Welcome to GRAC Robotics & AI Club</p>
        <h1 className="hero_title">Where Innovation Meets Intelligence</h1>
        <p className="hero_description">
          Join a student-driven community that empowers you to design, build, and
          innovate with cutting-edge robotics and AI technology.
        </p>

        {/* Category Pills */}
        <div className="hero_pills">
          <span className="pill"><RoboticsIcon /> Robotics</span>
          <span className="pill"><AiMlIcon /> AI & ML</span>
          <span className="pill"><InnovationIcon /> Innovation</span>
        </div>

        {/* Action Buttons */}
        <div className="hero_buttons">
          <button className="AuthButton BtnSignup hero_btn_primary">
            Join the Club <ArrowRightIcon />
          </button>
          <button className="AuthButton BtnOutline hero_btn_secondary">
            Explore Projects
          </button>
        </div>

        {/* Stats Section */}
        <div className="hero_stats">
          <div className="stat_item">
            <h3 className="stat_number">250+</h3>
            <p className="stat_label">Active Members</p>
          </div>
          <div className="stat_item">
            <h3 className="stat_number">40+</h3>
            <p className="stat_label">Projects</p>
          </div>
          <div className="stat_item">
            <h3 className="stat_number">7+</h3>
            <p className="stat_label">Awards</p>
          </div>
        </div>
      </div>

      {/* Right Column: Image & Floating UI */}
      <div className="hero_image_container">
        {/* Main Hero Image - REPLACE src WITH YOUR IMAGE URL */}
        <img 
          src="https://placehold.co/600x700/png" 
          alt="Robotics Lab" 
          className="main_hero_image"
        />

        {/* Floating Glass Cards */}
        <div className="glass_card card_top_left">
          <div className="card_icon"><LabIcon /></div>
          <div className="card_text">
            <span className="card_label">Active</span>
            <span className="card_title">Robotics Lab</span>
          </div>
        </div>

        <div className="glass_card card_bottom_right">
          <div className="card_icon"><ProjectIcon /></div>
          <div className="card_text">
            <span className="card_title">AI Projects</span>
            <span className="card_label">in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroShowcase;