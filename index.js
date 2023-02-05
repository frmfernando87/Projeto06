require("express-async-errors")
require("dotenv/config")
const migrationsRun = require("./src/database/sqlite/migrations")
const AppError = require("./src/utils/AppError")

const cors = require("cors")
const express = require("express")
const routes = require("./src/routes")
const uploadConfig = require("./src/configs/upload")

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)
/*app.get("/message/:id/:user", (request, response) => {
  const { id, user } = request.params

  response.send(`Mensagem ID: ${id}.
  Para o usuario: ${user}.
  `)
})
app.get("/users", (request, response) => {
  const { page, limit } = request.query

  response.send(`Pagina: ${page}.
  Mostrar: ${limit}.
  `)
})
*/
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server Error",
  })
})

const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
