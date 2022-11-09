import Product from "../../../product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Uva Rocha", 10.0);

const MocksRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Teste unit product user", () => {
  it("should be able to find a product", async () => {
    const productRepository = MocksRepository();
    const usercase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Uva Rocha",
      price: 10.0,
    };
    const result = await usercase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MocksRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usercase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usercase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
