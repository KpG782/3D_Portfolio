import React from "react";

const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {sub && (
        <span className="eyebrow">
          <span className="inline-block w-6 h-px bg-current opacity-60" />
          {sub}
          <span className="inline-block w-6 h-px bg-current opacity-60" />
        </span>
      )}
      <h2
        className="font-semibold tracking-tight md:text-5xl text-3xl max-w-3xl"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
    </div>
  );
};

export default TitleHeader;
