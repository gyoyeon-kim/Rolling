// components/Badge.js
import React from "react";

const BADGE_STYLES = {
  지인: { background: "#FFF0D6", color: "#FF8832" },
  동료: { background: "#F8F0FF", color: "#9935FF" },
  가족: { background: "#E4FBDC", color: "#2BA600" },
  친구: { background: "#E2F5FF", color: "#00A2FE" },
};

const Badge = ({ type }) => {
  return (
    <em className="badge" style={BADGE_STYLES[type]}>
      {type}
    </em>
  );
};

export default Badge;
