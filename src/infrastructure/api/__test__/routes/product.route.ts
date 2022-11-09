import express, { Request, Response } from "express";
import Product from "../../../../domain/product/entity/product";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../../../../domain/usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../../domain/usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../../domain/usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../../domain/usecase/product/update/update.product.usecase";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  //const usecase = new CreateProductUseCase();
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const outPut = await usecase.execute(productDto);
    console.log("outPut", outPut);
    res.send(outPut);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const outPut = await usecase.execute({});
    res.send(outPut);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const usecaseUpdate = new UpdateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const OutputUpdateProductDto = await usecaseUpdate.execute(productDto);
    res.send(OutputUpdateProductDto);
  } catch (error) {
    res.status(500).send(error);
  }
});
