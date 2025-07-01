import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await API.post("/projects/", {
        name,
        description,
      });
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error(error);
      setErrorMsg("Error creating project.");
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create New Project</h2>
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <form onSubmit={handleCreateProject}>
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
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
