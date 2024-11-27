const express = require('express');
const db = require('../config/db');
const bodyParser = require('body-parser');
const clientController = require('../controllers/clientController');

const router = express.Router();

// Définir la route pour récupérer tous les clients avec leur région
router.get('/clients', clientController.getClients);

router.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM client WHERE ID_client = ?`;
  
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la suppression du client' });
      }
      res.status(200).json({ message: 'Client supprimé avec succès' });
    });
  });

  router.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const { nom, prenom, age, ID_region } = req.body;
    const query = `
      UPDATE client 
      SET nom = ?, prenom = ?, age = ?, ID_region = ? 
      WHERE ID_client = ?
    `;
  
    db.query(query, [nom, prenom, age, ID_region, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la modification du client' });
      }
      res.status(200).json({ message: 'Client modifié avec succès' });
    });
  });

  router.get('/regions', (req, res) => {
  const query = 'SELECT ID_region, libelle FROM region';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des régions' });
    }
    res.status(200).json(results);
  });
});

router.post('/clients', async (req, res) => {
    try {
      const { nom, prenom, age, ID_region } = req.body;
  
      // Validation des champs requis
      if (!nom || !prenom || !age || !ID_region) {
        return res.status(400).json({ error: 'Tous les champs (nom, prénom, âge, ID_region) sont requis.' });
      }
  
      // Requête SQL pour insérer un nouveau client
      const query = `
        INSERT INTO client (nom, prenom, age, ID_region)
        VALUES (?, ?, ?, ?)
      `;
  
      // Exécution de la requête
      const [result] = await db.promise().execute(query, [nom, prenom, age, ID_region]);
  
      // Réponse en cas de succès
      res.status(201).json({
        message: 'Client ajouté avec succès.',
        client: {
          ID_client: result.insertId,
          nom,
          prenom,
          age,
          ID_region,
        },
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un client:', error);
  
      // Réponse en cas d'erreur serveur
      res.status(500).json({
        error: 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
      });
    }
  });
  

module.exports = router;
