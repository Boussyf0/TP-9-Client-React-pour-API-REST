import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onCompteSubmitted, compteToEdit, onCancelEdit }) {
  // Initialisation de l'état pour stocker les données du formulaire
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mettre à jour le formulaire quand compteToEdit change
  useEffect(() => {
    if (compteToEdit) {
      setCompte({
        solde: compteToEdit.solde || '',
        dateCreation: compteToEdit.dateCreation || '',
        type: compteToEdit.type || ''
      });
    }
  }, [compteToEdit]);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompte({ ...compte, [name]: value });
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!compte.solde || parseFloat(compte.solde) < 0) {
      newErrors.solde = 'Le solde doit être un nombre positif';
    }

    if (!compte.dateCreation) {
      newErrors.dateCreation = 'La date de création est requise';
    }

    if (!compte.type) {
      newErrors.type = 'Le type de compte est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCompte({ solde: '', dateCreation: '', type: '' });
    setErrors({});
  };

  // Gestion de l'annulation de l'édition
  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const request = compteToEdit
      ? axios.put(`${API_BASE_URL}/comptes/${compteToEdit.id}`, compte)
      : axios.post(`${API_BASE_URL}/comptes`, compte);

    request
      .then(() => {
        const message = compteToEdit ? 'Compte modifié avec succès' : 'Compte ajouté avec succès';
        alert(message);
        resetForm();
        onCompteSubmitted();
      })
      .catch(error => {
        const errorMessage = compteToEdit
          ? 'Erreur lors de la modification du compte'
          : 'Erreur lors de l\'ajout du compte';
        alert(`${errorMessage}: ${error.message}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="mb-0">{compteToEdit ? 'Modifier le Compte' : 'Ajouter un Compte'}</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Solde (DH) *</label>
              <input
                type="number"
                step="0.01"
                name="solde"
                value={compte.solde}
                className={`form-control ${errors.solde ? 'is-invalid' : ''}`}
                onChange={handleChange}
                placeholder="Ex: 10000.00"
              />
              {errors.solde && <div className="invalid-feedback">{errors.solde}</div>}
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Date de Création *</label>
              <input
                type="date"
                name="dateCreation"
                value={compte.dateCreation}
                className={`form-control ${errors.dateCreation ? 'is-invalid' : ''}`}
                onChange={handleChange}
              />
              {errors.dateCreation && <div className="invalid-feedback">{errors.dateCreation}</div>}
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Type de Compte *</label>
              <select
                name="type"
                value={compte.type}
                className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                onChange={handleChange}
              >
                <option value="">Sélectionner un type</option>
                <option value="COURANT">Courant</option>
                <option value="EPARGNE">Épargne</option>
              </select>
              {errors.type && <div className="invalid-feedback">{errors.type}</div>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              type="submit"
              className={`btn ${compteToEdit ? 'btn-warning' : 'btn-primary'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'En cours...' : compteToEdit ? 'Modifier' : 'Ajouter'}
            </button>
            {compteToEdit && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompteForm;