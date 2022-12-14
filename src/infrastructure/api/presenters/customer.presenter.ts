import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../domain/usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };
    return toXML(
      {
        customers: data.customers.map((customer) => ({
          customer: {
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zip,
              city: customer.address.city,
            },
          },
        })),
      },
      xmlOptions
    );
  }
}
