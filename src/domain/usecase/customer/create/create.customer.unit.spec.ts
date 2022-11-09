import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Main Street",
    number: 123,
    zip: "zip",
    city: "city",
  },
};

const MocRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe(" unit Create a Customer", () => {
  it("should be able to create a customer", async () => {
    const customerRepository = MocRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });

  it("should not be able to create a customer with an existing name", async () => {
    const customerRepository = MocRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should not be able to create a customer with an existing address", async () => {
    const customerRepository = MocRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
