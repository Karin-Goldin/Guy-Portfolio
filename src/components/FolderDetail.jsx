import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { folders } from "../data/folders";
import Navbar from "./Navbar";
import Lottie from "lottie-react";

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
                    {project.type === "lottie" ? (
                      <LottieProjectPreview lottieFile={project.lottieFile} title={project.title} />
                    ) : project.type === "video" ? (
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

// Component to load and display Lottie animation as preview
function LottieProjectPreview({ lottieFile, title }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(lottieFile);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error(`Error loading Lottie animation ${lottieFile}:`, error);
      }
    };

    if (lottieFile) {
      loadAnimation();
    }
  }, [lottieFile]);

  if (!animationData) {
    return <div className="project-img" style={{ backgroundColor: "#faf8f3" }} />;
  }

  return (
    <div className="project-img" style={{ backgroundColor: "#faf8f3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default FolderDetail;
