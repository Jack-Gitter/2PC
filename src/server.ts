import * as express from 'express'
import { Request, Response } from 'express'
import { TransactionCoordinator } from './coordinator/transaction-coordinator'


export class Server {

	private app 
	private port

	constructor(
		private transactionCoordinator: TransactionCoordinator, 
	) {
		this.app = express()
		this.port = 3000
	}

	async init() {

		this.app.get('/', (req: Request, res: Response) => {
		  res.send('Hello World!')
		})

		this.app.post('update-person', async (req: Request, res: Response) => {
			await this.transactionCoordinator.begin()
		})

		this.app.listen(this.port, () => {
		  console.log(`Example app listening on port ${this.port}`)
		})
	}
}
