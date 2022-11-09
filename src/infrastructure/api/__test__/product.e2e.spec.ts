import { app, sequelize } from "../express";
import request from "supertest";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("E2E Product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(10);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 20,
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(20);
  });

  it("should update product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();

    const updateResponse = await request(app)
      .put(`/product/${response.body.id}`)
      .send({
        id: response.body.id,
        name: "Product 1 Updated",
        price: 20,
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.id).toBe(response.body.id);
    expect(updateResponse.body.name).toBe("Product 1 Updated");
    expect(updateResponse.body.price).toBe(20);
  });
});
