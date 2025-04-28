module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {

    const dangerLevels = await db.collection('dangerlevels').find({}).toArray();
    const dangerLevelMap = {};
    
    dangerLevels.forEach(level => {
      dangerLevelMap[level.name] = level._id;
    });

    await db.createCollection('ents');

    await db.collection('ents').insertMany([
      {
        name: "Espreitador das Sombras",
        type: "Criatura",
        category: "Lenda Urbana",
        origin: "Internet",
        status: "",
        dangerLevel: dangerLevelMap["Sussurro"] || null,
        description: "Uma entidade que segue vítimas em locais escuros...",
        characteristics: ["Invisível em ambientes escuros", "Sussurra nomes"],
        weaknesses: ["Luz intensa", "Sal grosso"],
        isClassified: false,
        classificationLevel: 1
      }
    ]);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {

    await db.collection('ents').drop();

  }
};
