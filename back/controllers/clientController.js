const clientModel = require('../models/clientModel');

// Fonction pour gérer la récupération des clients avec leur région
const getClients = async (req, res) => {
  try {
    const clients = await clientModel.getClientsWithRegion();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

module.exports = {
  getClients,
};
