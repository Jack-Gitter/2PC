import express from 'express'
import Pool from 'pg-pool'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())

const port = 3001

const pool = new Pool({
    host: 'localhost',
    port: 5433,
    password: 'postgres',
    user: 'postgres',
    database: 'postgres'
})

//eslint-disable-next-line
app.post('/charge', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    const connection = await pool.connect()
    await connection.query("BEGIN TRANSACTION")
    await connection.query("UPDATE users SET money = money - 1 WHERE user = $1", [req.body.user.name])
    await connection.query("PREPARE TRANSACTION '$1';", [preparedStatementID])
    connection.release()
    res.json({ preparedStatementID })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
