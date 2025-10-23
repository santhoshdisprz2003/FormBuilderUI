import React, { useState } from "react";
import "../styles/FormList.css";

export default function FormList({
  forms,
  search,
  setSearch,
  openMenuId,
  setOpenMenuId,
  handleCreateForm,
  handleDelete,
}) {
  const [deletePopup, setDeletePopup] = useState(null); // holds form ID when showing popup

  const filteredForms = forms.filter((form) =>
    (form?.config?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = (id) => {
    handleDelete(id);
    setDeletePopup(null);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Convert status number to string
  const getStatusText = (status) => {
    if (status === 1 || status === "1") return "Published";
    if (status === 0 || status === "0") return "Draft";
    return "Draft"; // default
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    if (status === 1 || status === "1") return "published";
    if (status === 0 || status === "0") return "draft";
    return "draft"; // default
  };

  return (
    <div className="container">
      <div className="header">
        <p>Form List</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search forms"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="create-btn" onClick={handleCreateForm}>
            Create Form
          </button>
        </div>
      </div>

      <div className="card-grid">
        {filteredForms.map((form) => (
          <div key={form.id} className="card">
            <div className="card-header">
              <div className="card-title-wrapper">
                <h3 className="card-title">{form?.config?.title}</h3>
               
              </div>

              {/* 3-dot menu button */}
              <div className="menu-container">
                <button
                  className="menu-btn"
                  onClick={() =>
                    setOpenMenuId(openMenuId === form.id ? null : form.id)
                  }
                >
                  ⋮
                </button>

                {openMenuId === form.id && (
                  <div className="menu">
                    <button onClick={() => console.log("View Form", form.id)}>
                      View Form
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeletePopup(form.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

           <div className="card-meta">
                  <p className="meta-text">
                    Created by: {form?.createdBy || "Unknown"}
                  </p>
                  <p className="meta-text">
                    Created Date:{formatDate(form?.createdAt)}
                  </p>
                </div>

            <div className="card-footer">
              
              <span className={`status-btn ${getStatusClass(form?.status)}`}>
                {getStatusText(form?.status)}
              </span>
              <button className="view-btn">View Responses</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation popup */}
      {deletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h3>Delete Form</h3>
            </div>
            <hr />
            <div className="popup-content">
              <p>
                Are you sure you want to delete the form? <br />
                It deletes the form permanently.
              </p>
              <div className="popup-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setDeletePopup(null)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-delete-btn"
                  onClick={() => confirmDelete(deletePopup)}
                >
                  Yes,Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
