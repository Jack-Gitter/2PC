import express from 'express'
import Pool from 'pg-pool'
const app = express()
const port = 3001

const pool = new Pool({
    host: 'localhost',
    port: 5434,
    password: 'postgres',
    user: 'postgres',
    database: 'invoices'
})

app.post('/invoice', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    pool.query(`BEGIN TRANSACTION INSERT INTO invoices values ($1, $2, $3) PREPARE TRANSACTION $4`, [req.user.id, req.user.name, req.user.price, preparedStatementID])
    res.json({ preparedStatementID })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
