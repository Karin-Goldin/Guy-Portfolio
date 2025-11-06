import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { folders } from "../data/folders";
import Navbar from "./Navbar";

function FolderDetail() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const folder = folders[folderId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!folder) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Folder not found</h1>
          <button onClick={() => navigate("/")}>Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section id="projects" style={{ marginTop: "10vh" }}>
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">{folder.title}</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
          {folder.subtitle}
        </p>
        <div className="experience-details-container">
          <div className="projects-grid">
            {folder.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div
                  className="project-card"
                  onClick={() => {
                    if (project.projectId) {
                      navigate(`/project/${project.projectId}`);
                    }
                  }}
                  style={{
                    cursor: project.projectId ? "pointer" : "default",
                  }}
                >
                  <div className="project-image-wrapper">
                    {project.type === "video" ? (
                      project.poster?.endsWith(".mp4") ? (
                        <video
                          src={project.poster}
                          className="project-img"
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={project.title}
                        />
                      ) : (
                        <img
                          src={project.poster}
                          alt={project.title}
                          className="project-img"
                        />
                      )
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-img"
                      />
                    )}
                  </div>
                </div>
                <div className="project-meta">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <button
        className="back-button"
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: "2rem",
          left: "2rem",
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          border: "none",
          padding: "1rem 2rem",
          borderRadius: "50px",
          cursor: "pointer",
        }}
      >
        ← Back to Projects
      </button>
    </>
  );
}

export default FolderDetail;
