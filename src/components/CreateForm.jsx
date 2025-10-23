// src/components/CreateForm.jsx
import React, { useState } from "react";
import "../styles/CreateForm.css";
import "../styles/FormLayout.css";

import DraggableField from "./DraggableField";
import QuestionCard from "./QuestionCard";

export default function CreateForm() {
  const [activeTab, setActiveTab] = useState("configuration");
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [fields, setFields] = useState([]);

  const inputFields = [
    { id: 1, label: "Short Text", type: "short-text", maxChar: 100 },
    { id: 2, label: "Long Text", type: "long-text", maxChar: 500 },
    { id: 3, label: "Date Picker", type: "date-picker" },
    { id: 4, label: "Dropdown", type: "dropdown" },
    { id: 5, label: "File Upload", type: "file-upload" },
    { id: 6, label: "Number", type: "number" },
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("text/plain");
      const field = JSON.parse(data);
      setFields([...fields, { ...field, id: Date.now() }]);
    } catch (err) {}
  };

  const handleDelete = (index) => setFields(fields.filter((_, i) => i !== index));
  const handleCopy = (index) => setFields([...fields, { ...fields[index], id: Date.now() }]);

  return (
    <div className="create-form-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Form Builder</span> <span>›</span> <span>Create Form</span>
      </div>

      {/* Tabs */}
      <div className="tab-container">
        <button
          className={`tab ${activeTab === "configuration" ? "active" : ""}`}
          onClick={() => setActiveTab("configuration")}
        >
          Form Configuration
        </button>
        <button
          className={`tab ${activeTab === "layout" ? "active" : ""}`}
          onClick={() => setActiveTab("layout")}
        >
          Form Layout
        </button>
      </div>

      {/* FORM CONFIGURATION */}
      {activeTab === "configuration" && (
        <div className="form-section">
          <h3 className="section-title">Form Details</h3>

          <div className="form-group">
            <label htmlFor="formName">
              Form Name<span className="required">*</span>
            </label>
            <input
              id="formName"
              type="text"
              placeholder="Enter Form Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              maxLength={80}
            />
            <span className="char-count">{formName.length}/80</span>
          </div>

          <div className="form-group">
            <label htmlFor="formDesc">Form Description</label>
            <textarea
              id="formDesc"
              placeholder="Summarize the form’s purpose for internal reference."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
            <span className="char-count">{description.length}/200</span>
          </div>

          <div className="form-group visibility">
            <label>Form Visibility</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={visibility}
                onChange={() => setVisibility((v) => !v)}
              />
              <span className="slider round" />
            </label>
            <p className="help-text">
              Turn on to allow new workflows to use this form. Turn off to hide it,
              but existing workflows will keep working.
            </p>
          </div>
        </div>
      )}

      {/* FORM LAYOUT */}
      {activeTab === "layout" && (
        <div className="form-layout-container">
          <div className="form-layout-left">
            <h4 className="input-title">Input Fields</h4>
            <div className="input-field-list">
              {inputFields.map((field) => (
                <DraggableField key={field.id} field={field} />
              ))}
            </div>
          </div>

          <div
            className="form-layout-right"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {/* Keep your form header as it is */}
            <div className="form-header-box">
              <div className="form-header-title">Form Header</div>

              <input
                type="text"
                placeholder="Form Name"
                className="header-input"
                maxLength={80}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <span className="char-count right">{formName.length}/80</span>

              <textarea
                placeholder="Form Description (optional)"
                className="header-textarea"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="char-count right desc">{description.length}/200</span>
            </div>

            {/* Render dropped fields */}
            {fields.length === 0 && <p>Drag fields from the left panel</p>}
            {fields.map((field, i) => (
              <QuestionCard
                key={field.id}
                field={field}
                index={i}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="footer-buttons">
        <button className="draft-btn">Save as draft</button>

        {activeTab === "configuration" ? (
          <button
            className="next-btn"
            onClick={() => setActiveTab("layout")}
            disabled={!formName.trim()}
          >
            Next
          </button>
        ) : (
          <button className="publish-btn">Publish Form</button>
        )}
      </div>
    </div>
  );
}
