import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const costumer = new Customer("123", "João da Silva");
const address = new Address("Street", 123, "Zip", "City");
costumer.changeAddress(address);

//await customerRepository.create(costumer);

const MocksRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(costumer)),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Teste unit customer user", () => {
  it("should be able to find a customer", async () => {
    const customerRepository = MocksRepository();
    const usercase = new FindCustomerUseCase(customerRepository);

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

  it("should not find a customer", async () => {
    const customerRepository = MocksRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usercase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usercase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
