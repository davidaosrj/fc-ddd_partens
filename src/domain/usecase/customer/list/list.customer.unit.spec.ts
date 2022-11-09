import CustomerFactory from "../../../customer/factory/customer.factory";
import Address from "../../../customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 1, "13330-250", "São Paulo")
);

const customer2 = CustomerFactory.createWithAddress(
  "zizao",
  new Address("Street", 20, "20000-250", "Rio de Janeiro")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
  };
};

describe("List Customer", () => {
  it("should list all customers", async () => {
    const repository = MockRepository();
    const useCase = new ListCustomerUseCase(repository);
    const output = await useCase.execute({});
    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.city).toBe(customer1.Address.city);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.city).toBe(customer2.Address.city);
  });
});
