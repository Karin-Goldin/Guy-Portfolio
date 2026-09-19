import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import Navbar from "./Navbar";
import AuroraProjectDetail from "./AuroraProjectDetail";
import KimaProjectDetail from "./KimaProjectDetail";
import BrandBeeProjectDetail from "./BrandBeeProjectDetail";

const CUSTOM_LAYOUTS = {
  aurora: AuroraProjectDetail,
  kima: KimaProjectDetail,
  brandbee: BrandBeeProjectDetail,
};

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[projectId];

  if (!project) {
    return <div>Project not found</div>;
  }

  const CustomLayout = CUSTOM_LAYOUTS[projectId];
  if (CustomLayout) {
    return <CustomLayout project={project} />;
  }

  return (
    <div className="project-detail-page">
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

      <div className="project-description-section">
        <div className="container">
          <h1 className="project-title">{project.title}</h1>
          <div className="project-metadata">
            <p className="project-long-description">{project.longDescription}</p>

            <div className="metadata-column">
              <div className="metadata-item">
                <span className="metadata-label">CLIENT:</span>
                <span className="metadata-value">{project.client}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">ROLE:</span>
                {project.credits?.map(({ label, value }) => (
                  <span key={label} className="metadata-value">
                    {value || label}
                  </span>
                ))}
              </div>
            </div>

            <div className="metadata-column">
              <div className="metadata-item">
                <span className="metadata-label">DATE:</span>
                <span className="metadata-value">{project.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

export default ProjectDetail;
