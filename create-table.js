import { sql } from './db.js'

// sql`DROP TABLE IF EXISTS animes`.then(() =>{
//   console.log("Tabela apagada")
// })

sql`
CREATE TABLE animes(
  id     TEXT   PRIMARY KEY,
  name   TEXT,
  urlImg TEXT,
  likes  INTEGER
);
`.then(() =>{
  console.log("Tabela criada")
})