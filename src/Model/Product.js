import { MissionUtils, Console } from "@woowacourse/mission-utils";

class Product {
  #name;
  #price;
  #quantity;
  #promotion; // Promotion

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#promotion = promotion; //프로모션 객체
  }

  toString() {
    return `product : ${this.#name} ${this.#price} ${this.#quantity} ${
      this.#promotion
    }`;
  }
}

export default Product;