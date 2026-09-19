import { useNavigate } from "react-router-dom";
import { projects as projectData } from "../data/projects";

const VIDEO_PROJECT_IDS = ["mojo", "photosynthesis", "earthday", "showreel"];

const FOLDER_PROJECTS = [
  {
    title: "Web Animations",
    type: "folder",
    subtitle: "Interactive motion design",
    projectCount: 3,
    previewGradients: [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    ],
  },
];

function Projects() {
  const navigate = useNavigate();

  const videoProjects = VIDEO_PROJECT_IDS.map((id) => ({
    ...projectData[id],
    type: "video",
    projectId: id,
  }));

  const allProjects = [...videoProjects, ...FOLDER_PROJECTS];

  return (
    <section id="projects">
      <h1 className="title">Projects</h1>
      <div className="experience-details-container">
        <div className="projects-grid">
          {allProjects.map((project, index) => (
            <div key={index} className="project-item">
              {project.type === "folder" ? (
                <div
                  className={`folder-card ${project.stacked ? "stacked" : ""}`}
                  onClick={() => {
                    const folderId = project.title
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    navigate(`/folder/${folderId}`);
                  }}
                >
                  <div className="folder-preview">
                    {project.previewGradients?.map((gradient, idx) => (
                      <div
                        key={idx}
                        className="preview-item"
                        style={{ backgroundImage: gradient }}
                      ></div>
                    ))}
                    <div className="folder-overlay">
                      <svg
                        className="folder-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      <div className="folder-count">
                        {project.projectCount || 0} Projects
                      </div>
                    </div>
                  </div>
                  <div className="folder-info">
                    <h3 className="folder-title-text">{project.title}</h3>
                    <p className="folder-subtitle">{project.subtitle || ""}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="project-card"
                    onClick={() => {
                      if (project.projectId) {
                        navigate(`/project/${project.projectId}`);
                      }
                    }}
                    style={{ cursor: project.projectId ? "pointer" : "default" }}
                  >
                    <div className="project-image-wrapper">
                      {project.type === "video" ? (
                        project.poster.endsWith(".mp4") ? (
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <img
        src="/assets/arrow.png"
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "./#contact")}
      />
    </section>
  );
}

export default Projects;
