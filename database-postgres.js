import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres{
 
  async create(anime){
    const animeId = randomUUID()
    const { name, urlImg, likes } = anime

    await sql`insert into animes (id, name, urlimg, likes) VALUES (${animeId}, ${name}, ${urlImg}, ${likes})`
  }

  async update(id,anime){
    const { name, urlImg, likes } = anime

    await sql`update animes set name = ${name}, urlimg = ${urlImg}, likes = ${likes} WHERE id = ${id}`
  }

  async delete(id){
    await sql`delete from animes where id = ${id}`
  }

  async listAll(){
    const animes = await sql`select * from animes order by name asc`

    return animes
  }

  async listBest(){
    const animes = await sql`select * from animes WHERE likes > 0 order by likes desc;
    `

    return animes
  }

  async addLike(id){
    await sql`update animes set likes = likes + 1 WHERE id = ${id}`
  }
}