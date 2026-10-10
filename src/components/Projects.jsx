import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects as projectData } from "../data/projects";
import "./Projects.css";

const PROJECT_ORDER = [
  "mojo",
  "photosynthesis",
  "earthday",
  "showreel",
  "aurora",
  "kima",
  "brandbee",
];

let activePreview = null;

function stopPreview(video) {
  if (!video) return;
  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    /* seek can throw before metadata loads */
  }
  video.classList.remove("is-playing");
  if (activePreview === video) activePreview = null;
}

function startPreview(video) {
  if (!video) return;
  if (activePreview && activePreview !== video) stopPreview(activePreview);
  activePreview = video;
  const attempt = video.play();
  if (attempt && typeof attempt.then === "function") {
    attempt
      .then(() => video.classList.add("is-playing"))
      .catch(() => {});
  }
}

function Mark() {
  return (
    <svg width="14" height="14" viewBox="-12 -12 24 24" aria-hidden="true">
      <g fill="#D4457F">
        <rect x="-3.2" y="-11" width="6.4" height="22" rx="3.2" />
        <rect
          x="-3.2"
          y="-11"
          width="6.4"
          height="22"
          rx="3.2"
          transform="rotate(60)"
        />
        <rect
          x="-3.2"
          y="-11"
          width="6.4"
          height="22"
          rx="3.2"
          transform="rotate(-60)"
        />
      </g>
    </svg>
  );
}

function ProjectCard({ project, eager }) {
  const linkRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const link = linkRef.current;
    if (!video || !link || !project.previewVideo) return undefined;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    if (motion.matches) return undefined;

    const play = () => startPreview(video);
    const stop = () => stopPreview(video);

    let observer;
    if (hover.matches) {
      link.addEventListener("mouseenter", play);
      link.addEventListener("mouseleave", stop);
      link.addEventListener("focus", play);
      link.addEventListener("blur", stop);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.6) play();
            else stop();
          });
        },
        { threshold: [0, 0.6, 1] }
      );
      observer.observe(link);
    }

    return () => {
      stop();
      link.removeEventListener("mouseenter", play);
      link.removeEventListener("mouseleave", stop);
      link.removeEventListener("focus", play);
      link.removeEventListener("blur", stop);
      observer?.disconnect();
    };
  }, [project.previewVideo]);

  return (
    <li
      className={`project-card${
        project.featured ? " project-card--featured" : ""
      }`}
    >
      <Link
        ref={linkRef}
        className="project-card__link"
        to={`/project/${project.id}`}
      >
        <div className="project-card__media">
          <img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            loading={eager ? "eager" : "lazy"}
          />
          {project.previewVideo && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster={project.thumbnail}
              src={project.previewVideo}
            />
          )}
          {project.featured && (
            <span className="project-card__badge">Featured</span>
          )}
          {project.previewVideo && (
            <span className="project-card__play" aria-hidden="true">
              <svg width="12" height="14" viewBox="0 0 12 14">
                <path d="M1 1.2 L11 7 L1 12.8 Z" fill="#141414" />
              </svg>
            </span>
          )}
        </div>
        <div className="project-card__meta">
          <h3 className="project-card__title">{project.title}</h3>
          <span className="project-card__client">
            {project.client} · {project.year}
          </span>
        </div>
        <ul className="project-card__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </Link>
    </li>
  );
}

function Projects() {
  const [expanded, setExpanded] = useState(false);
  const list = PROJECT_ORDER.map((id) => ({ id, ...projectData[id] }));

  return (
    <section id="projects">
      <div className="projects__inner">
        <header className="projects__head">
          <p className="projects__eyebrow">
            <Mark />
            {list.length} projects
          </p>
          <h2 className="projects__title">
            Selected <span>work</span>
          </h2>
        </header>
        <ul className={`projects__grid${expanded ? " is-expanded" : ""}`}>
          {list.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              eager={index === 0}
            />
          ))}
        </ul>
        {list.length > 4 && (
          <button
            type="button"
            className="projects__more"
            aria-expanded={expanded}
            hidden={expanded}
            onClick={() => setExpanded(true)}
          >
            More work <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default Projects;
