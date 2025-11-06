import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";

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

export default ProjectDetail;
