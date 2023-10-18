import { randomUUID } from "node:crypto"

export class DatabaseMemory{
  #animes = new Map()

  list(){
    return Array.from(this.#animes.entries()).map((animeArray)=>{
      const id = animeArray[0]
      const data = animeArray[1]

      return {
        id,
        ...data
      }
    })
  }

  create(anime){
    const animeId = randomUUID()
    this.#animes.set(animeId, anime)
  }

  update(id,anime){
    this.#animes.set(id, anime)
  }

  delete(id){
    this.#animes.delete(id)
  }
}