module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection('Patent');

    await db.collection('Patent').insertMany([
      {
        name: "Ovo",
        description: ""
      },
      {
        name: "Larva",
        description: ""
      },
      {
        name: "Ninfa",
        description: ""
      },
      {
        name: "Pupa",
        description: ""
      },
      {
        name: "Imago",
        description: ""
      }
         
    ]);

  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {

    await db.collection('Patent').drop();

  }
};
