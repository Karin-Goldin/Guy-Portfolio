import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import Lottie from "lottie-react";
import Navbar from "./Navbar";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[projectId];

  if (!project) {
    return <div>Project not found</div>;
  }

  // Special handling for Aurora project
  if (projectId === "aurora") {
    return <AuroraProjectDetail project={project} navigate={navigate} />;
  }

  // Special handling for Kima project
  if (projectId === "kima") {
    return <KimaProjectDetail project={project} navigate={navigate} />;
  }

  console.log("Project data:", project);
  console.log("Background GIF path:", project.backgroundGif);

  return (
    <div className="project-detail-page">
      {/* Background Video/GIF Section */}
      <div className="project-hero">
        {project.backgroundGif.endsWith(".gif") ? (
          <img
            src={project.backgroundGif}
            className="project-background-gif"
            alt={project.title}
            style={{
              transform: `scale(${1 + scrollY * 0.0005})`,
              transformOrigin: "center center",
            }}
          />
        ) : (
          <video
            src={project.backgroundGif}
            className="project-background-gif"
            autoPlay
            loop
            muted
            playsInline
            style={{
              transform: `scale(${1 + scrollY * 0.0005})`,
              transformOrigin: "center center",
            }}
          />
        )}
      </div>

      {/* Description Section */}
      <div className="project-description-section">
        <div className="container">
          <h1 className="project-title">{project.title}</h1>
          {/* 3-Column Layout */}
          <div className="project-metadata">
            {/* Left Column - Description */}
            <p className="project-long-description">
              {project.longDescription}
            </p>

            {/* Middle Column - CLIENT and ROLE */}
            <div className="metadata-column">
              <div className="metadata-item">
                <span className="metadata-label">CLIENT:</span>
                <span className="metadata-value">{project.client}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">ROLE:</span>
                <span className="metadata-value">{project.role}</span>
                <span className="metadata-value">{project.role2}</span>
              </div>
            </div>

            {/* Right Column - DATE */}
            <div className="metadata-column">
              <div className="metadata-item">
                <span className="metadata-label">DATE:</span>
                <span className="metadata-value">{project.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="project-video-section">
        <div className="container">
          <div className="video-wrapper">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="project-video-player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                transform: `scale(${1 + scrollY * 0.0003})`,
                transformOrigin: "center center",
              }}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

// Aurora-specific component
function AuroraProjectDetail({ project, navigate }) {
  const [mainAnimation, setMainAnimation] = useState(null);
  const [influencingAnimation, setInfluencingAnimation] = useState(null);
  const [behavioralAnimation, setBehavioralAnimation] = useState(null);
  const [interventionalAnimation, setInterventionalAnimation] = useState(null);
  const [hrAnimation, setHrAnimation] = useState(null);
  const [productAnimation, setProductAnimation] = useState(null);
  const [strategyAnimation, setStrategyAnimation] = useState(null);
  const [marketingAnimation, setMarketingAnimation] = useState(null);
  const [testAnimation, setTestAnimation] = useState(null);
  const [rolloutAnimation, setRolloutAnimation] = useState(null);

  useEffect(() => {
    // Load Lottie animations
    const loadAnimation = async (path, setter) => {
      try {
        const response = await fetch(path);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error loading animation ${path}:`, error);
      }
    };

    if (project.lottieFiles) {
      loadAnimation(project.lottieFiles.mainBackground, setMainAnimation);
      loadAnimation(project.lottieFiles.influencing, setInfluencingAnimation);
      loadAnimation(project.lottieFiles.behavioral, setBehavioralAnimation);
      loadAnimation(
        project.lottieFiles.interventional,
        setInterventionalAnimation,
      );
      loadAnimation(project.lottieFiles.hr, setHrAnimation);
      loadAnimation(project.lottieFiles.product, setProductAnimation);
      loadAnimation(project.lottieFiles.strategy, setStrategyAnimation);
      loadAnimation(project.lottieFiles.marketing, setMarketingAnimation);
      loadAnimation(project.lottieFiles.test, setTestAnimation);
      loadAnimation(project.lottieFiles.rollout, setRolloutAnimation);
    }
  }, [project.lottieFiles]);

  return (
    <div className="aurora-project-page">
      <Navbar />

      {/* Main Background Animation */}
      <div className="aurora-hero">
        {mainAnimation && (
          <div className="aurora-main-animation">
            <Lottie animationData={mainAnimation} loop={true} autoplay={true} />
          </div>
        )}
      </div>

      {/* Project Info Section */}
      <div className="aurora-info-section">
        <div className="aurora-info-left">
          <h1 className="aurora-title">{project.title}</h1>
          <p className="aurora-description">{project.longDescription}</p>
        </div>
        <div className="aurora-info-right">
          <div className="aurora-meta-item">
            <span className="aurora-meta-label">CLIENT:</span>
            <span className="aurora-meta-value">{project.client}</span>
          </div>
          <div className="aurora-meta-item">
            <span className="aurora-meta-label">DATE:</span>
            <span className="aurora-meta-value">{project.date}</span>
          </div>
          <div className="aurora-meta-item">
            <span className="aurora-meta-label">ROLE:</span>
            <span className="aurora-meta-value">{project.role}</span>
          </div>
          <div className="aurora-meta-item">
            <span className="aurora-meta-label">DESIGN:</span>
            <span className="aurora-meta-value">
              {project.role2?.replace("DESIGN: ", "")}
            </span>
          </div>
          <div className="aurora-meta-item">
            <span className="aurora-meta-label">WEB DEVELOPER:</span>
            <span className="aurora-meta-value">
              {project.role3?.replace("WEB DEVELOPER: ", "")}
            </span>
          </div>
        </div>
      </div>

      {/* Catchphrase Section */}
      <div className="aurora-catchphrase">
        {influencingAnimation && (
          <div className="aurora-catchphrase-animation">
            <Lottie
              animationData={influencingAnimation}
              loop={true}
              autoplay={true}
            />
          </div>
        )}
        <div className="aurora-catchphrase-text"></div>
      </div>

      {/* Services Grid */}
      <div className="aurora-services-grid">
        <div className="aurora-service-item">
          {productAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={productAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
        <div className="aurora-service-item">
          {strategyAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={strategyAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
        <div className="aurora-service-item">
          {marketingAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={marketingAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
        <div className="aurora-service-item">
          {hrAnimation && (
            <div className="aurora-service-animation">
              <Lottie animationData={hrAnimation} loop={true} autoplay={true} />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
        <div className="aurora-service-item">
          {behavioralAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={behavioralAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>

        <div className="aurora-service-item">
          {interventionalAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={interventionalAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>

        <div className="aurora-service-item">
          {testAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={testAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
        <div className="aurora-service-item">
          {rolloutAnimation && (
            <div className="aurora-service-animation">
              <Lottie
                animationData={rolloutAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          )}
          <span className="aurora-service-text"></span>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="aurora-industries-grid">
        <div className="aurora-industry-item">health + wellbeing</div>
        <div className="aurora-industry-item">
          transport <span className="aurora-purple">{">>>"}</span>ation
        </div>
        <div className="aurora-industry-item">
          public <span className="aurora-purple">(policy)</span>
        </div>
        <div className="aurora-industry-item">retail consumer</div>
        <div className="aurora-industry-item">
          financial <span className="aurora-purple">$</span>ervices
        </div>
        <div className="aurora-industry-item">
          digi<span className="aurora-purple">{"<tal>"}</span> platforms
        </div>
        <div className="aurora-industry-item">education</div>
        <div className="aurora-industry-item">
          sustain<span className="aurora-purple">ability</span>
          <br />
          energy & food
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

// Kima-specific component
function KimaProjectDetail({ project, navigate }) {
  return (
    <div className="kima-project-page">
      <Navbar />

      {/* Hero with GIF only */}
      <div className="kima-hero">
        <img
          src="/assets/kima.gif"
          alt="Kima animation"
          className="kima-gif"
        />
      </div>

      {/* Project Info Section */}
      <div className="kima-info-section">
        <div className="kima-info-left">
          <h1 className="kima-project-title">{project.title}</h1>
          <p className="kima-project-description">{project.longDescription}</p>
        </div>
        <div className="kima-info-right">
          <div className="kima-meta-item">
            <span className="kima-meta-label">CLIENT:</span>
            <span className="kima-meta-value">{project.client}</span>
          </div>
          <div className="kima-meta-item">
            <span className="kima-meta-label">ROLE:</span>
            <span className="kima-meta-value">{project.role}</span>
          </div>
          <div className="kima-meta-item">
            <span className="kima-meta-label">DESIGN:</span>
            <span className="kima-meta-value">
              {project.role2?.replace("DESIGN: ", "")}
            </span>
          </div>
          <div className="kima-meta-item">
            <span className="kima-meta-label">WEB DEVELOPER:</span>
            <span className="kima-meta-value">
              {project.role3?.replace("WEB DEVELOPER: ", "")}
            </span>
          </div>
          <div className="kima-meta-item">
            <span className="kima-meta-label">DATE:</span>
            <span className="kima-meta-value">{project.date}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

export default ProjectDetail;
