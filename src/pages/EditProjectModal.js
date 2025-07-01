import React, { useState, useEffect } from "react";
import API from "../services/api";

function EditProjectModal({ project, onClose, onProjectUpdated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/projects/${project.id}/`, {
        name,
        description,
      });
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMsg("Error updating project.");
    }
  };

  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Project</h2>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <form onSubmit={handleUpdateProject}>
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="8"
          />
          <button type="submit">Update Project</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;
