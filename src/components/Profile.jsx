import { useState, useEffect, useRef } from "react";
import "./Profile.css";

function Profile() {
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef(null);

  // behind-nav + profile-in-view, throttled to one update per frame
  useEffect(() => {
    const profileSection = document.getElementById("profile");
    let ticking = false;

    const update = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 50);

      if (profileSection) {
        const rect = profileSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        const inView =
          isInViewport && window.scrollY < profileSection.offsetHeight * 0.8;
        document.body.classList.toggle("profile-in-view", inView);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("profile-in-view");
    };
  }, []);

  // Respect "reduce motion": show the poster frame instead of playing
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section id="profile">
      <div className="section__pic-container">
        <video
          ref={videoRef}
          className={`hero-video ${isScrolled ? "behind-nav" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          aria-label="Animated intro: hey, I'm an animator"
        >
          <source src="/assets/hero.webm" type="video/webm" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          I'm Guy —<br />I make things{" "}
          <span className="hero__accent">move.</span>
        </h1>
      </div>

      <a
        href="#projects"
        className="hero__scroll"
        aria-label="Scroll to my work"
      >
        <span aria-hidden="true">See my work</span>
        <svg
          className="hero__scroll-arrow"
          width="30"
          height="46"
          viewBox="0 0 30 46"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="hero-cue-grad"
              x1="0"
              y1="0"
              x2="0"
              y2="46"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#D4457F" />
              <stop offset="1" stopColor="#2F5BE0" />
            </linearGradient>
          </defs>
          <path
            d="M15 4 V40 M5 30 L15 40 L25 30"
            fill="none"
            stroke="url(#hero-cue-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}

export default Profile;
