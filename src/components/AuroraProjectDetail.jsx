import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Navbar from "./Navbar";

function AuroraProjectDetail({ project }) {
  const navigate = useNavigate();
  const [animations, setAnimations] = useState({});

  useEffect(() => {
    if (!project.lottieFiles) return;

    const loadAnimation = async (key, path) => {
      try {
        const response = await fetch(path);
        const data = await response.json();
        setAnimations((prev) => ({ ...prev, [key]: data }));
      } catch (error) {
        console.error(`Error loading animation ${path}:`, error);
      }
    };

    Object.entries(project.lottieFiles).forEach(([key, path]) => {
      loadAnimation(key, path);
    });
  }, [project.lottieFiles]);

  return (
    <div className="aurora-project-page">
      <Navbar />

      <div className="aurora-hero">
        {animations.mainBackground && (
          <div className="aurora-main-animation">
            <Lottie
              animationData={animations.mainBackground}
              loop={true}
              autoplay={true}
            />
          </div>
        )}
      </div>

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
          {project.credits?.map(({ label, value }) => (
            <div key={label} className="aurora-meta-item">
              <span className="aurora-meta-label">{label}:</span>
              <span className="aurora-meta-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="aurora-catchphrase">
        {animations.influencing && (
          <div className="aurora-catchphrase-animation">
            <Lottie
              animationData={animations.influencing}
              loop={true}
              autoplay={true}
            />
          </div>
        )}
        <div className="aurora-catchphrase-text"></div>
      </div>

      <div className="aurora-services-grid">
        {[
          "product",
          "strategy",
          "marketing",
          "hr",
          "behavioral",
          "interventional",
          "test",
          "rollout",
        ].map((key) =>
          animations[key] ? (
            <div key={key} className="aurora-service-item">
              <div className="aurora-service-animation">
                <Lottie
                  animationData={animations[key]}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <span className="aurora-service-text"></span>
            </div>
          ) : null
        )}
      </div>

      <div className="aurora-industries-section">
        <img
          src="/assets/aurora-json/lowerSQDesign.png"
          alt="Aurora industries"
          className="aurora-industries-image"
        />
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

export default AuroraProjectDetail;
