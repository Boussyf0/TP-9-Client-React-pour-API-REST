import React from 'react';

function CompteList({ comptes, onDelete, onEdit }) {
  if (comptes.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <h2 className="card-title mb-3">Liste des Comptes</h2>
          <p className="text-muted">Aucun compte disponible. Ajoutez votre premier compte ci-dessus.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="mb-0">Liste des Comptes</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Solde</th>
                <th>Date de Création</th>
                <th>Type</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comptes.map(compte => (
                <tr key={compte.id}>
                  <td>{compte.id}</td>
                  <td className="fw-bold">
                    {parseFloat(compte.solde).toLocaleString('fr-MA', {
                      style: 'currency',
                      currency: 'MAD'
                    })}
                  </td>
                  <td>{new Date(compte.dateCreation).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`badge ${compte.type === 'COURANT' ? 'bg-info' : 'bg-success'}`}>
                      {compte.type}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(compte)}
                      title="Modifier"
                    >
                      <i className="bi bi-pencil"></i> Modifier
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(compte.id)}
                      title="Supprimer"
                    >
                      <i className="bi bi-trash"></i> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer bg-white text-muted">
        Total: {comptes.length} compte{comptes.length > 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default CompteList;