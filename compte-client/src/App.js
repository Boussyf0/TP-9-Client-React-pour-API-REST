import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';
import API_BASE_URL from './config';

function App() {
  const [comptes, setComptes] = useState([]);
  const [error, setError] = useState(null);
  const [compteToEdit, setCompteToEdit] = useState(null);

  const fetchComptes = () => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => {
        setComptes(response.data);
        setError(null);
      })
      .catch(error => setError(`Erreur lors du chargement des comptes: ${error.message}`));
  };

  useEffect(() => {
    fetchComptes();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      axios.delete(`${API_BASE_URL}/comptes/${id}`)
        .then(() => {
          fetchComptes();
          alert('Compte supprimé avec succès');
        })
        .catch(error => setError(`Erreur lors de la suppression: ${error.message}`));
    }
  };

  const handleEdit = (compte) => {
    setCompteToEdit(compte);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompteSubmitted = () => {
    fetchComptes();
    setCompteToEdit(null);
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Gestion des Comptes Bancaires</span>
        </div>
      </nav>

      <div className="container">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <CompteForm
              onCompteSubmitted={handleCompteSubmitted}
              compteToEdit={compteToEdit}
              onCancelEdit={() => setCompteToEdit(null)}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <CompteList
              comptes={comptes}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;