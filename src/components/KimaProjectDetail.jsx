import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Navbar from "./Navbar";

const KIMA_GRID_ITEMS = [
  { file: "chainA.json", label: "Chain A" },
  { file: "chainAChainB.json", label: "Chain A to Chain B Transaction" },
  { file: "crossChainTransaction.json", label: "Cross Chain Transactions" },
  { file: "anyUser.json", label: "Any User, Any Blockchain" },
  {
    file: "noSmartContracts.json",
    label: "No Smart Contracts, No Code Vulnerabilities",
  },
];

function KimaProjectDetail({ project }) {
  const navigate = useNavigate();
  const [animations, setAnimations] = useState({});

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const files = [
      ...KIMA_GRID_ITEMS.map((i) => i.file),
      "whatMakesKimaDiffrenece.json",
    ];

    Promise.all(
      files.map(async (file) => {
        try {
          const url = `${base}/assets/kima-json/${encodeURIComponent(file)}`;
          const r = await fetch(url);
          if (r.ok) return [file, await r.json()];
        } catch (e) {
          console.warn(`Kima: failed to load ${file}`, e);
        }
        return [file, null];
      })
    ).then((entries) => {
      const obj = {};
      entries.forEach(([file, data]) => {
        if (data) obj[file] = data;
      });
      setAnimations(obj);
    });
  }, []);

  return (
    <div className="kima-project-page">
      <Navbar />

      <div className="kima-hero">
        <img src="/assets/kima.gif" alt="Kima animation" className="kima-gif" />
      </div>

      <div className="kima-info-section">
        <div className="kima-info-left">
          <h1 className="kima-project-title">{project.title}</h1>
          <p className="kima-project-description">{project.longDescription}</p>
        </div>
        <div className="kima-info-right">
          <div className="kima-meta-item">
            <span className="kima-meta-label">CLIENT:</span>
            <span className="kima-meta-value">{project.client}</span>
          </div>
          <div className="kima-meta-item">
            <span className="kima-meta-label">DATE:</span>
            <span className="kima-meta-value">{project.date}</span>
          </div>
          {project.credits?.map(({ label, value }) => (
            <div key={label} className="kima-meta-item">
              <span className="kima-meta-label">{label}:</span>
              <span className="kima-meta-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="kima-logo-section">
        <img
          src="/assets/kima-json/LOGO.jpg"
          alt="Kima logo"
          className="kima-logo"
        />
      </div>

      <div className="kima-grid-section">
        {KIMA_GRID_ITEMS.map((item) => (
          <div key={item.file} className="kima-grid-item">
            {animations[item.file] && (
              <Lottie
                animationData={animations[item.file]}
                loop={true}
                autoplay={true}
                className="kima-grid-animation"
              />
            )}
            <span className="kima-grid-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="kima-what-makes-different">
        {animations["whatMakesKimaDiffrenece.json"] && (
          <Lottie
            animationData={animations["whatMakesKimaDiffrenece.json"]}
            loop={true}
            autoplay={true}
            className="kima-what-makes-different-animation"
          />
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Projects
      </button>
    </div>
  );
}

export default KimaProjectDetail;
