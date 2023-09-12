import React from "react";

const PrizeViewWrapp: React.FC = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="game-prize-section section-border" style={{ flex: 1 }}>
      <div className="game-prize-section-wrapper">{children}</div>
    </div>
  );
};

export default PrizeViewWrapp;
