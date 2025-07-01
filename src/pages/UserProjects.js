import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import EditProjectModal from "./EditProjectModal"; // Import the modal

function UserProjects() {
  const [projects, setProjects] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects/");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}/`);
      fetchProjects(); // Refresh project list after deletion
    } catch (error) {
      console.error(error);
      setErrorMsg("Error deleting project.");
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/user-projects/${projectId}`);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleProjectUpdated = () => {
    fetchProjects();
  };

  const truncateDescription = (description) => {
    if (description.length > 50) {
      return description.substring(0, 50) + "...";
    }
    return description;
  };

  return (
    <div className="user-projects-container">
      <h2 className="projects-title">My Projects</h2>
      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <div className="project-list">
        <h3>Project List</h3>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Short Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td onClick={() => handleProjectClick(project.id)} style={{ cursor: 'pointer' }}>{project.name}</td>
                <td>{truncateDescription(project.description)}</td>
                <td>
                  {userRole === "admin" && (
                    <div className="action-buttons">
                      <button className="icon-button" onClick={() => handleEditClick(project)}>✏️</button> {/* Edit icon */}
                      <button
                        className="icon-button"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        🗑️ {/* Delete icon */}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          onProjectUpdated={handleProjectUpdated}
        />
      )}
    </div>
  );
}

export default UserProjects;