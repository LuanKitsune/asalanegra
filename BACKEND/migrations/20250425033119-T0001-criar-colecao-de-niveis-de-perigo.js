module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.createCollection('dangerLevel');

    await db.collection('dangerLevel').insertMany([
      {
        name: "Sussurro",
        description: "Uma presença que se esconde nas sombras da percepção. Apenas os mais sensíveis percebem seus sinais sutis, a beira do limiar de realidade ou alucinação."
      },
      {
        name: "Assombração",
        description: "O véu entre planos se rasga o bastante para revelar formas indistintas. Não podem tocar, mas podem afetar sentimentos, e a mente indiretamente."
      },

      {
        name: "Mazela",
        description: "O pesadelo encarnado, a manifestação pode afetar diretamente."
      },
      {
        name: "Especial",
        description: "Manifestações de muitos poderes, capazes de coisas fantásticas geralmente terríveis."
      },
      {
        name: "Calamidade",
        description: "Manifestações com capacidade de afetar diretamente uma cidade inteira."
      },
      {
        name: "Cataclisma",
        description: "Nações caem, e mapas são reescritos da noite para o dia, estes ent's podem refazer o mundo a sua imagem."
      },
      {
        name: "Divindade",
        description: "Eles são uma constante, e a humanidade apenas um acidente temporário. Existências que transcendem a compreensão humana, capazes de pôr em xeque a própria realidade. Em geral são impossíveis de deter, sendo a contenção a única esperança."
      }
    ]);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {

    await db.collection('dangerLevel').drop();

  }
};