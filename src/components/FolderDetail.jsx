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
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Projects
      </button>
      <section id="projects" style={{ marginTop: "10vh", paddingLeft: "50px" }}>
        <h1 className="title" style={{ textAlign: "left", paddingLeft: "1rem" }}>{folder.title}</h1>
        {folder.description && (
          <p style={{ 
            textAlign: "left", 
            color: "#000", 
            marginBottom: "2rem",
            maxWidth: "800px",
            margin: "0 0 2rem 0",
            paddingLeft: "1rem",
            lineHeight: "1.6",
            fontSize: "1rem"
          }}>
            {folder.description}
          </p>
        )}
        {folder.subtitle && !folder.description && (
          <p style={{ textAlign: "left", color: "#666", marginBottom: "2rem", paddingLeft: "1rem" }}>
            {folder.subtitle}
          </p>
        )}
        <div className="experience-details-container">
          <div className="projects-grid" style={{ margin: "3rem 0", maxWidth: "none", paddingLeft: "1rem", paddingRight: "1rem" }}>
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
                      <LottieProjectPreview
                        lottieFile={project.lottieFile}
                        title={project.title}
                      />
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
    return (
      <div className="project-img" style={{ backgroundColor: "#faf8f3" }} />
    );
  }

  return (
    <div
      className="project-img"
      style={{
        backgroundColor: "#faf8f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
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
