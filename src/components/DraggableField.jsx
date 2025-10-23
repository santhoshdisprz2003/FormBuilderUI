// src/components/DraggableField.jsx
import React from "react";
import "../styles/DraggableField.css";

export default function DraggableField({ field }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(field));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="input-field-item" draggable onDragStart={handleDragStart}>
      <span className={`icon icon-${field.type}`} />
      <span>{field.label}</span>
    </div>
  );
}
