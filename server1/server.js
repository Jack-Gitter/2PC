import express from 'express'
import Pool from 'pg-pool'
const app = express()
const port = 3001

const pool = Pool({
    host: 'localhost',
    port: 5433,
    password: 'postgres',
    username: 'postgres',
    db: 'payment'
})

app.post('/requestChargePayment', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    res.json({ preparedStatementID })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
