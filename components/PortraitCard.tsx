"use client";
import { useRef } from "react";
import Image from "next/image";

export default function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5;

    // 3-D tilt on the card
    card.style.transition = "transform 0.08s ease";
    card.style.transform  = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 11}deg) scale(1.04)`;

    // Subtle parallax on the photo
    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.08s ease";
      imgRef.current.style.transform  = `translateX(${x * 10}px) translateY(${y * 7}px) scale(1.07)`;
    }
  }

  function onLeave() {
    const card = cardRef.current;
    if (!card) return;

    card.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
    card.style.transform  = "";

    if (imgRef.current) {
      imgRef.current.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
      imgRef.current.style.transform  = "";
    }
  }

  return (
    <div
      ref={cardRef}
      className="portraitCard"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: "transform", cursor: "default" }}
    >
      <div className="portraitFrame">
        {/* Shine sweep overlay */}
        <div className="portraitShine" aria-hidden="true" />

        <Image
          ref={imgRef}
          src="/profile.jpg"
          alt="Leela Krishna Koppolu"
          width={420}
          height={500}
          className="profileImage"
          priority
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="portraitMeta">
        <div>
          <p className="metaLabel">Target roles</p>
          <p className="metaValue">AI/ML Engineer, Data Engineer, Software Engineer, Data Analyst</p>
        </div>
        <div>
          <p className="metaLabel">Location</p>
          <p className="metaValue">Dallas, Texas with openness to relocation</p>
        </div>
        <div>
          <p className="metaLabel">Education</p>
          <p className="metaValue">M.S. Computer Science, UT Arlington</p>
        </div>
      </div>
    </div>
  );
}
