import { addressDatasource } from "./database/addresses-datasource"
import { coordinatorDatasource } from "./database/coordinator-datasource"
import { personDatasource } from "./database/persons-datasource"


const main = async () => {
	await personDatasource.initialize()
	await addressDatasource.initialize()
	await coordinatorDatasource.initialize()
}


main()
