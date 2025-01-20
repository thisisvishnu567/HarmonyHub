import React, { useState } from "react";
import "./Grid.css";

const Grid = () => {
  const [playing, setPlaying] = useState(null);

  const videos = [
    { id: 1, title: "5 Ways to help someone struggling with their mental health | Mental Health Season - BBC Ideas", url: "https://www.youtube.com/embed/wIUcc8g17wg" },
    { id: 2, title: "Gender Equality 👧🧑🏻 SDG 5 👩‍💼 Sustainable Development Goals for Kids", url: "https://www.youtube.com/embed/F-OURmsmEKo" },
    { id: 3, title: "Atomic Habits for Mental Health", url: "https://www.youtube.com/embed/AOHT-YiOeQA" },
    { id: 4, title: "How to Have a Better Mental Health", url: "https://www.youtube.com/embed/IY2y6kH745A" },
    { id: 5, title: "The BEST Exercise To Improve Your Mental Health", url: "https://www.youtube.com/embed/e9B3QWESkLI" },
    { id: 6, title: "School-Link: Caring for the mental health needs of children and young people", url: "https://www.youtube.com/embed/kmSinPMVU2U" },
    { id: 7, title: "Mental Health For Kids  Positive Habits For Good Mental Health", url: "https://www.youtube.com/embed/rkE29fpmsSI" },
    { id: 8, title: "Mental Health for Students in School", url: "https://www.youtube.com/embed/rBUjOY12gJA" },
    { id: 9, title: "The Number One Best Exercise for Depression", url: "https://www.youtube.com/embed/hnlAPBbxNko" }
  ];

  const handleVideoClick = (id) => {
    setPlaying((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid-container">
      <header className="header">
        <h1 className="header-title">SELF ASSESSMENT PLATFORM</h1>
        <p className="header-description">Our platform offers users a seamless experience to track and improve their mental health. Through interactive tools and educational resources, we empower individuals to take control of their well-being and foster a supportive community.</p>
      </header>

      <div className="youtube-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            {playing === video.id ? (
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="thumbnail"
                onClick={() => handleVideoClick(video.id)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.url.split('/').pop()}/0.jpg`}
                  alt={video.title}
                  className="thumbnail-image"
                />
                <div className="play-overlay">
                  <span>Play</span>
                </div>
              </div>
            )}
            <h4 className="title">{video.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
