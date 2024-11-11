import { Console } from "@woowacourse/mission-utils";

class BuyProduct {
  #name;
  #quantity;
  #price = 0;
  #totalPrice = 0;

  constructor(name, count) {
    this.#name = name;
    this.#quantity = Number(count);
  }

  toString() {
    Console.print(
      `${this.#name} ${this.#quantity}  price:${this.#price}  totalPrice:${
        this.#totalPrice
      }`
    );
  }

  setCount(count) {
    this.#quantity = Number(count);
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
