import { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <nav id="desktop-nav" className="">
        <div
          className="logo"
          onClick={() => (window.location.href = "#profile")}
        >
          Guy Goldin
        </div>
        <div>
          <ul className="nav-links">
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? "active" : ""}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav id="hamburger-nav" className="">
        <div
          className="logo"
          onClick={() => (window.location.href = "#profile")}
        >
          <svg
            className="logo-mark"
            width="22"
            height="22"
            viewBox="-12 -12 24 24"
            aria-hidden="true"
          >
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
          <span>guy goldin</span>
        </div>
        <div className="hamburger-menu">
          <div
            className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links ${isMenuOpen ? "open" : ""}`}>
            <li>
              <a
                href="#projects"
                onClick={toggleMenu}
                className={activeSection === "projects" ? "active" : ""}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={toggleMenu}
                className={activeSection === "about" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={toggleMenu}
                className={activeSection === "contact" ? "active" : ""}
              >
                Contact
              </a>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
