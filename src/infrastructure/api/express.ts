import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./__test__/routes/customer.route";
import { productRoute } from "./__test__/routes/product.route";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);
export let sequelize: Sequelize;

async function setuDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setuDb();
