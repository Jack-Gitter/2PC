import "reflect-metadata"
import { AddressesService } from "./addresses/addresses.service"
import { TransactionCoordinator } from "./coordinator/transaction-coordinator"
import { addressDatasource } from "./database/addresses-datasource"
import { coordinatorDatasource } from "./database/coordinator-datasource"
import { CoordinatorLog } from "./database/entities/coordinator-log.entity"
import { personDatasource } from "./database/persons-datasource"
import { PersonsService } from "./persons/persons.service"
import { Server } from "./server"


const main = async () => {
	await personDatasource.initialize()
	await addressDatasource.initialize()
	await coordinatorDatasource.initialize()
	const coordinatorRepository = coordinatorDatasource.getRepository(CoordinatorLog)
	const addressService = new AddressesService(addressDatasource)
	const personService = new PersonsService(personDatasource)
	const transactionCoordinator = new TransactionCoordinator(addressService, personService, coordinatorRepository)
	const server = new Server(transactionCoordinator)
	await server.init()
}


main()
