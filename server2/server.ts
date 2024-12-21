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

app.post('/requestSendInvoice', async (req, res) => {
    const preparedStatementID = crypto.randomUUID()
    res.json({ preparedStatementID })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
