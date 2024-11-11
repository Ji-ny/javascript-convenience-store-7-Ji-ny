import { Console } from "@woowacourse/mission-utils";

class BuyProduct {
  #name;
  #quantity;

  constructor(name, count) {
    this.#name = name;
    this.#quantity = Number(count);
  }

  toString() {
    Console.print(`${this.#name} ${this.#quantity}`);
  }

  setCount(count) {
    this.#quantity = Number(count);
  }

  getBuyProduct() {
    return {
      name: this.#name,
      count: this.#quantity,
    };
  }
}

export default BuyProduct;
