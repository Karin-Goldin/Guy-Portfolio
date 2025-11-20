import { useState, useEffect } from "react";

function Profile() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const profileSection = document.getElementById("profile");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check if profile section is currently in viewport
      if (profileSection) {
        const rect = profileSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        // Only hide projects when profile is actively in view at top
        if (
          isInViewport &&
          window.scrollY < profileSection.offsetHeight * 0.8
        ) {
          document.body.classList.add("profile-in-view");
        } else {
          document.body.classList.remove("profile-in-view");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="profile">
      <div className="section__pic-container">
        <img
          src="/assets/hero-1_2.gif"
          className={`hero-gif ${isScrolled ? "behind-nav" : ""}`}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}

export default Profile;
