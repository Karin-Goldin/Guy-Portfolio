import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const projects = [
    {
      title: "MOJO",
      type: "video",
      projectId: "mojo", // Add projectId for navigation
      videoUrl: "https://vimeo.com/1127841129?share=copy&fl=sv&fe=ci",
      poster: "/assets/backround-video.gif", // GIF poster for the video
      demoUrl: "https://vimeo.com/1127841129?share=copy&fl=sv&fe=ci",
    },
    {
      title: "Photosynthesis",
      type: "video",
      projectId: "photosynthesis", // Add projectId for navigation
      videoUrl: "https://vimeo.com/1128816164?share=copy&fl=sv&fe=ci",
      poster: "/assets/cut-for-gif.mp4",
      demoUrl: "https://vimeo.com/1128816164?share=copy&fl=sv&fe=ci",
    },
    {
      title: "Earthday",
      type: "video",
      projectId: "earthday",
      poster: "/assets/earthday.gif",
      videoUrl: "https://vimeo.com/1130848081?share=copy&fl=sv&fe=ci",
      demoUrl: "https://vimeo.com/1130848081?share=copy&fl=sv&fe=ci",
    },
    {
      title: "Showreel",
      type: "video",
      projectId: "showreel",
      poster: "/assets/showreel.gif",
      videoUrl: "https://vimeo.com/1130821059?share=copy&fl=sv&fe=ci",
      demoUrl: "https://vimeo.com/1130821059?share=copy&fl=sv&fe=ci",
    },
    {
      title: "LAYOUT - A Motion Design Series",
      type: "image",
      image: "/assets/project-2.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "Brand Identity Project",
      type: "image",
      image: "/assets/project-3.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "Web Animations",
      type: "folder",
      isFolder: true,
      subtitle: "Interactive motion design",
      projectCount: 3,
      previewGradients: [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      ],
    },
    {
      title: "Gaming",
      type: "folder",
      isFolder: true,
      subtitle: "Game design & development",
      projectCount: 12,
      previewGradients: [
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
      ],
      stacked: true,
    },
    {
      title: "Loops",
      type: "folder",
      isFolder: true,
      subtitle: "Seamless animation loops",
      projectCount: 6,
      previewGradients: [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
        "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
      ],
    },
  ];

  return (
    <section id="projects">
      <p className="section__text__p1">Browse My Recent</p>
      <h1 className="title">Projects</h1>
      <div className="experience-details-container">
        <div className="projects-grid">
          {projects.map((project, index) => (
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
                      if (project.projectId && !project.isFolder) {
                        navigate(`/project/${project.projectId}`);
                      }
                    }}
                    style={{
                      cursor:
                        project.projectId && !project.isFolder
                          ? "pointer"
                          : "default",
                    }}
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
