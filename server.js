import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
// const database = new DatabaseMemory() 
const database = new DatabasePostgres

//para o adm criar um novo anime
server.post('/animes', async (request, replay) =>{
  const { name, urlImg, likes } = request.body

  await database.create({
    name,
    urlImg,
    likes,
  })

  return replay.status(201).send()
})

// para o adm alterar um anime
server.put('/animes/:id', async (request, replay)=>{
  const animeId = request.params.id
  const { name, urlImg, likes } = request.body

  await database.update(animeId,{
    name,
    urlImg,
    likes,
  })

  return replay.status(204).send()
})

// para o adm deletar um anime
server.delete('/animes/:id', async (request, replay)=>{
  const animeId = request.params.id

  await database.delete(animeId)

  return replay.status(204).send()
})

// para listar todos os animes em ordem
server.get('/animes', async () =>{
  const animes = await database.listAll()

  return animes
})

// para listar os melhores animes
server.get('/best-animes', async () =>{
  const animes = await database.listBest()

  return animes
})

// para o user votar em um anime
server.put('/add-like/:id', async (request, replay)=>{
  const animeId = request.params.id
  
  await database.addLike(animeId)

  return replay.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})