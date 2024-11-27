const db = require('../config/db'); // Importer la connexion à la base de données

// Fonction pour récupérer tous les clients avec leur région
const getClientsWithRegion = async () => {
  const query = `
    SELECT client.ID_client, client.nom, client.prenom, client.age, region.libelle AS region
    FROM client
    JOIN region ON client.ID_region = region.ID_region;
  `;

  try {
    const [results] = await db.promise().query(query); // Utilisation de .promise() avec await
    return results;
  } catch (err) {
    throw err; // Propagation de l'erreur pour la gestion ultérieure
  }
};

const getRegions = async ()=> {
    const query = "SELECT * FROM region";

}
module.exports = {
    getClientsWithRegion,
  };