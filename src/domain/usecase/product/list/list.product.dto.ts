export interface InputListProductDto {}

type product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: product[];
}
