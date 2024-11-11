import { Console } from "@woowacourse/mission-utils";

class BuyProduct {
  #name;
  #quantity;
  #price;
  #totalPrice;

  constructor(name, quantity, price = 0, totalPrice = 0) {
    this.#name = name;
    this.#quantity = Number(quantity);
    this.#price = price;
    this.#totalPrice = totalPrice;
  }

  toString() {
    Console.print(
      `${this.#name} ${this.#quantity}  price:${this.#price}  totalPrice:${
        this.#totalPrice
      }`
    );
  }

  setQuantity(quantity) {
    this.#quantity = Number(quantity);
  }

  setPrice(price) {
    this.#price = price;
  }

  setTotalPrice(totalPrice) {
    this.#totalPrice = totalPrice;
  }

  getBuyProduct() {
    return {
      name: this.#name,
      quantity: this.#quantity,
      price: this.#price,
      totalPrice: this.#totalPrice,
    };
  }
}

export default BuyProduct;
