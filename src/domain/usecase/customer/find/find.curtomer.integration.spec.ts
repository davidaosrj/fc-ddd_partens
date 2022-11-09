import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Teste customer user", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be able to find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usercase = new FindCustomerUseCase(customerRepository);
    const costumer = new Customer("123", "João da Silva");
    const address = new Address("Street", 123, "Zip", "City");
    costumer.changeAddress(address);

    await customerRepository.create(costumer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "João da Silva",
      address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
      },
    };
    const result = await usercase.execute(input);

    expect(result).toEqual(output);
  });
});
