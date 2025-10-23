import React, { useState } from "react";
import "../styles/QuestionCard.css";

export default function QuestionCard({ field, index, onDelete, onCopy }) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [required, setRequired] = useState(false);

  return (
    <div className="question-card">
      {/* Question Input */}
      <input
        type="text"
        placeholder="Untitled Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={150}
        className="question-input"
      />
      <span className="char-count">{question.length}/150</span>

      {/* Description Input (conditionally shown) */}
      {showDescription && (
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="description-input"
        />
      )}

      {/* Field Type Display (disabled text field) */}
      {field.maxChar && (
        <input
          type="text"
          value={`${field.label} (Up to ${field.maxChar} characters)`}
          disabled
          className="field-type-display"
        />
      )}

      {/* Actions Row */}
      <div className="question-actions">
        <div className="action-buttons">
          <button onClick={() => onCopy(index)} className="action-btn copy-btn" title="Copy">
            📄
          </button>
          <button onClick={() => onDelete(index)} className="action-btn delete-btn" title="Delete">
            🗑️
          </button>
        </div>

        <div className="toggle-options">
          <div className="toggle-item">
            <span className="toggle-text">Description</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={showDescription}
                onChange={() => setShowDescription((v) => !v)}
              />
              <span className="slider round" />
            </label>
          </div>

          <div className="toggle-item">
            <span className="toggle-text">Required</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={required}
                onChange={() => setRequired((v) => !v)}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </div>

      {/* Required Indicator */}
      {required && <span className="required-indicator">* Required</span>}
    </div>
  );
}
