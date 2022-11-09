import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "macarao",
  price: 200.0,
};

const MocRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe(" unit Create a Product", () => {
  it("should be able to create a product", async () => {
    const productRepository = MocRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
