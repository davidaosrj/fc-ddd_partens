import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../../domain/usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../../domain/usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import customerPresenter from "../../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const outPut = await usecase.execute(customerDto);
    res.send(outPut);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const outPut = await usecase.execute({});
  res.format({
    json: async () => res.send(outPut),
    xml: async () => res.send(customerPresenter.listXML(outPut)),
  });
  /* try {
    const outPut = await usecase.execute({});
    res.send(outPut);
  } catch (error) {
    res.status(500).send(error);
  }*/
});
