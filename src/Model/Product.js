import { MissionUtils, Console } from "@woowacourse/mission-utils";

class Product {
  #name;
  #price;
  #quantity;
  #promotion; // Promotion

  constructor(name, price, quantity, promotion = null, promotionQuantity = 0) {
    this.#name = name;
    this.#price = Number(price);
    this.#quantity = Number(quantity);
    this.#promotion = promotion; //프로모션 객체
  }

  toString() {
    return `- ${this.#name} ${this.#price}원 ${this.#quantity}개 ${
      this.#promotion
    }`;
  }

  getProduct() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
      promotion: this.#promotion,
    };
  }
}

export default Product;
