import { useState, useEffect } from "react";

function Profile() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="profile">
      <div className="section__pic-container">
        <img
          src="./assets/hero-1_2.gif"
          alt="Guy Goldin animated profile"
          className={`hero-gif ${isScrolled ? "behind-nav" : ""}`}
        />
      </div>
    </section>
  );
}

export default Profile;
