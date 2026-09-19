import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Navbar from "./Navbar";

// Row 1: 1and12.json, 2.json (span 2 each)
// Row 2: 3.png, 4.png (span 2 each)
// Row 3: 5.json, 6.json, 7.json, 8.json
// Row 4: 9.json, 10.json, 11.json, 1and12.json
// Row 5: 13.json, 14.json, 15.json, 16.json
const BRANDBEE_GRID_ITEMS = [
  { file: "1and12.json", type: "json", span: 2 },
  { file: "2.json", type: "json", span: 2 },
  { file: "3.png", type: "image", span: 2 },
  { file: "4.png", type: "image", span: 2 },
  { file: "5.json", type: "json" },
  { file: "6.json", type: "json" },
  { file: "7.json", type: "json" },
  { file: "8.json", type: "json" },
  { file: "9.json", type: "json" },
  { file: "10.json", type: "json" },
  { file: "11.json", type: "json" },
  { file: "1and12.json", type: "json" },
  { file: "13.json", type: "json" },
  { file: "14.json", type: "json" },
  { file: "15.json", type: "json" },
  { file: "16.json", type: "json" },
];

function BrandBeeProjectDetail({ project }) {
  const navigate = useNavigate();
  const [animations, setAnimations] = useState({});

  useEffect(() => {
    const jsonFiles = [
      ...new Set(
        BRANDBEE_GRID_ITEMS.filter((i) => i.type === "json").map((i) => i.file)
      ),
    ];

    Promise.all(
      jsonFiles.map((f) =>
        fetch(`/assets/brandBee-json/${f}`).then((r) => r.json())
      )
    )
      .then((data) => {
        const obj = {};
        jsonFiles.forEach((f, i) => (obj[f] = data[i]));
        setAnimations(obj);
      })
      .catch((err) => console.error("Error loading BrandBee animations:", err));
  }, []);

  return (
    <div className="brandbee-project-page">
      <Navbar />

      <div className="brandbee-hero">
        <video
          src="/assets/brandBee-json/background-gif.mp4"
          className="brandbee-gif"
          autoPlay
          loop
          muted
          playsInline
          aria-label="BrandBee animation"
        />
      </div>

      <div className="brandbee-info-section">
        <div className="brandbee-info-left">
          <h1 className="brandbee-project-title">{project.title}</h1>
          <p className="brandbee-project-description">
            {project.longDescription}
          </p>
        </div>
        <div className="brandbee-info-right">
          <div className="brandbee-meta-item">
            <span className="brandbee-meta-label">CLIENT:</span>
            <span className="brandbee-meta-value">{project.client}</span>
          </div>
          <div className="brandbee-meta-item">
            <span className="brandbee-meta-label">DATE:</span>
            <span className="brandbee-meta-value">{project.date}</span>
          </div>
          {project.credits?.map(({ label, value }) => (
            <div key={label} className="brandbee-meta-item">
              <span className="brandbee-meta-label">{label}:</span>
              <span className="brandbee-meta-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="brandbee-logo-grid-wrapper">
        <div className="brandbee-logo-section">
          <img
            src="/assets/brandBee-json/logo.png"
            alt="BrandBee logo"
            className="brandbee-logo"
          />
        </div>

        <div className="brandbee-grid-section">
          {BRANDBEE_GRID_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`brandbee-grid-item ${
                item.file === "2.json" ? "brandbee-grid-item-no-radius" : ""
              } ${item.span === 2 ? "brandbee-grid-item-span-2" : ""}`}
            >
              {item.type === "json" ? (
                animations[item.file] && (
                  <Lottie
                    animationData={animations[item.file]}
                    loop={true}
                    autoplay={true}
                    className="brandbee-grid-animation"
                  />
                )
              ) : (
                <img
                  src={`/assets/brandBee-json/${item.file}`}
                  alt={`BrandBee ${index + 1}`}
                  className="brandbee-grid-image"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

export default BrandBeeProjectDetail;
