import express from 'express'
const app = express()
const port = 3000

app.post('/order', async (req, res) => {
    const res1 = fetch('http://localhost:3001/requestChargePayment', {method: "POST"})
    const res2 = fetch('http://localhost:3002/requestSendInvoice', {method: "POST"})
    await Promise.all([res1, res2])
    // we need to send back the body with the 200 status, and name of prepared statement
    // if we get 2 200ok, then we sent commitChargePayemnt, commitSendInvoice. Otherwise, we send back rollbackChargePayment, rollbackSendInvoice
    console.log(res1)
    console.log(res2)
    res.json("hi")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
