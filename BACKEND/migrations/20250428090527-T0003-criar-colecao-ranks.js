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
        description: "Sua percepção de realidade é apenas um frágil invólucro ao seu redor, prestes a ser partido, mas até lá, tudo que lhe resta é espiar o mundo através da fina camada da sua ilusão, por onde só é capaz enxergar sombras, e murmúrios do mundo real. A organização te vigia, sonhos estranhos, e pesadelos terríveis lhe invadem a noite. O conhecimento protege a integridade, aceitar a verdade, te salva da loucura."
      },
      {
        name: "Larva",
        description: "Seu despertar chegou, e com ele a fome pelo saber, mas cada saber vem cercado de mais perguntas sem respostas. Sua ingênua ânsia por saber, te deixa exposto como um nervo, a um mundo desigual, misterioso, e fantasticamente terrível. Seja prudente, e esforçado e talvez possa ser útil. "
      },
      {
        name: "Ninfa",
        description: "A primeira grande mudança chegou, e você já não é mais um repugnante idiota rastejante, você conhece os ritos, conhece as criaturas, e até mesmo resolveu alguns casos, mas você é apenas uma peça em um jogo maior. Da mesma forma que a organização te protege, ela te usa, e você sabe disso, pois oque você faz deixa marcas no mundo, mas também em você."
      },
      {
        name: "Pupa",
        description: "A experiência lhe faz duro, envolvido em um casulo de dores, traumas, paradoxos, mas apesar de tudo você chegou até aqui. Você guarda segredos que destruiriam a sociedade como conhecemos. Você já viu demais, doou demais, cedeu demais, e percebe que não sobrou muito da pessoa que você já foi, e nada da pessoa que gostaria de ser. Você se pergunta se ainda há volta, mas oque está acontecendo agora, é maior que qualquer arrependimento, pois há um trabalho a ser feito, e caso não o faça, ninguém o fará."
      },
      {
        name: "Imago",
        description: "Sua metamorfose está completa, suas asas de sombra se estendem para proteger os alienados, e antes oque era medo se torna domínio, se tornou o pesadelo que persegue os pesadelos, e agora é você quem esconde segredos, os acertos e pecados da organização, agora se mesclam aos seus, e as coisas em muito se confundem. Você  não é mais um membro qualquer, é um símbolo, o mundo é seu ovo agora, e está pronto para choca-lo."
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
