import "reflect-metadata";
import { addressDatasource } from "./addresses-datasource";
import { personDatasource } from "./persons-datasource";
import { Address } from "./entities/address.entity";
import { Person } from "./entities/person.entity";


async function seed() {
  await addressDatasource.initialize();
  await personDatasource.initialize();

  const addressRepo = addressDatasource.getRepository(Address);
  const personRepo = personDatasource.getRepository(Person);

  // insert one address
  const address = addressRepo.create({
    city: "City",
    state: "NJ",
    zip: "07030",
  });

  await addressRepo.save(address);

  // insert one person
  const person = personRepo.create({
    firstname: "Jack",
    lastname: "Gitter",
    age: 30,
  });

  await personRepo.save(person);


  await addressDatasource.destroy();
  await personDatasource.destroy();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
});
