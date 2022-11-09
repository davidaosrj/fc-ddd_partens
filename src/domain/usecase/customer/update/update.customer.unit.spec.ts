import customerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../customer/factory/customer.factory";
import Address from "../../../customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";
const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 1, "13330-250", "São Paulo")
);

const input = {
  id: customer.id,
  name: "Doe",
  address: {
    street: "Street updated",
    number: 2,
    zip: "51233-233",
    city: "Rio de Janeiro",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  };
};

describe("Update customer unit test", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);
    // const result = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
