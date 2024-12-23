import express from 'express'
import Pool from 'pg-pool'
import bodyParser from 'body-parser'
const app = express()
const port = 3001
app.use(bodyParser.json())

const pool = new Pool({
    host: 'localhost',
    port: 5434,
    password: 'postgres',
    user: 'postgres',
    database: 'postgres'
})

app.post('/invoice', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    const connection = await pool.connect()
    await connection.query('BEGIN TRANSACTION')
    await connection.query(`INSERT INTO invoices values (${req.body.user.id}, ${req.body.user.name}, ${req.body.price}`)
    await connection.query(`PREPARE TRANSACTION ${preparedStatementID}`)
    connection.release()
    res.json({ preparedStatementID })
})

app.post('/invoice/commit/:id', async (req, res) => {

}) 

app.post('/invoice/rollback/:id', async (req, res) => {

}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
