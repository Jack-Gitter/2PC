import express from 'express'
import Pool from 'pg-pool'
const app = express()
const port = 3001

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    password: 'postgres',
    user: 'postgres',
    database: 'payment'
})

app.post('/charge', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    pool.query(`BEGIN TRANSACTION UPDATE payments SET money = money - 1 WHERE user = $1 PREPARE TRANSACTION $2`, [req.user.name, preparedStatementID])
    res.json({ preparedStatementID })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
