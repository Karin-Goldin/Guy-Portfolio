import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const projects = [
    {
      title: "MOJO",
      type: "video",
      projectId: "mojo", // Add projectId for navigation
      videoUrl: "https://vimeo.com/1127841129?share=copy&fl=sv&fe=ci",
      poster: "./assets/backround-video.gif", // GIF poster for the video
      demoUrl: "https://vimeo.com/1127841129?share=copy&fl=sv&fe=ci",
    },
    {
      title: "Photosynthesis",
      type: "video",
      projectId: "photosynthesis", // Add projectId for navigation
      videoUrl: "https://vimeo.com/1128816164?share=copy&fl=sv&fe=ci",
      poster: "./assets/cut-for-gif.gif",
      demoUrl: "https://vimeo.com/1128816164?share=copy&fl=sv&fe=ci",
    },
    {
      title: "Whoppah",
      type: "image",
      image: "./assets/project-3.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "Nike : Own The Court",
      type: "image",
      image: "./assets/project-1.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "LAYOUT - A Motion Design Series",
      type: "image",
      image: "./assets/project-2.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "Brand Identity Project",
      type: "image",
      image: "./assets/project-3.png",
      githubUrl: "https://github.com/",
      demoUrl: "https://github.com/",
    },
    {
      title: "Clips",
      type: "folder",
      isFolder: true,
    },
    {
      title: "Gaming",
      type: "folder",
      isFolder: true,
    },
    {
      title: "Loops",
      type: "folder",
      isFolder: true,
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
                    <img
                      src={project.poster}
                      alt={project.title}
                      className="project-img"
                    />
                  ) : project.type === "folder" ? (
                    <div className="folder-content">
                      <h3 className="folder-title">{project.title}</h3>
                    </div>
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
      <img
        src="./assets/arrow.png"
        alt="Arrow icon"
        className="icon arrow"
        onClick={() => (window.location.href = "./#contact")}
      />
    </section>
  );
}

export default Projects;
