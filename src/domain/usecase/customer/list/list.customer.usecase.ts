import Customer from "../../../customer/entity/customer";
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import { OutputCreateCustomerDto } from "../create/create.customer.dto";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.CustomerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city,
        },
      })),
    };
  }
}
