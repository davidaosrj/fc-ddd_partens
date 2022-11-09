import ProductFactory from "../../../product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createByzizao("Melao", 10.0);

const input = {
  id: product.id,
  name: "Melancia",
  price: 20.0,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Update product unit test", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);
    // const result = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
