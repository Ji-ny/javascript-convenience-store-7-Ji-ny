import { Console } from "@woowacourse/mission-utils";

class BuyProduct {
  #name;
  #count;
  #totalPrize = 0;

  constructor(name, count) {
    this.#name = name;
    this.#count = Number(count);
  }

  toString() {
    Console.print(`${this.#name} ${this.#count} ${this.#totalPrize}`);
  }

  setTotalPrize(totalPrize) {
    this.#totalPrize = totalPrize;
  }

  setCount(count) {
    this.#count = Number(count);
  }

  getBuyProduct() {
    return {
      name: this.#name,
      count: this.#count,
      totalPrize: tthis.#totalPrize,
    };
  }
}

export default BuyProduct;
