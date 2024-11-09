import { Console, MissionUtils } from "@woowacourse/mission-utils";

class Promotion {
  #name;
  #buy;
  #get;
  #start_data;
  #end_data;
  #quantity; // 프로모션 개수 추가.

  constructor(name, buy, get, start_data, end_data, quantity) {
    this.#name = name;
    this.#buy = buy;
    this.#get = get;
    this.#start_data = start_data;
    this.#end_data = end_data;
    this.#quantity = quantity;
  }

  toString() {
    return `promotion : ${this.#name} ${this.#buy} ${this.#get} ${
      this.#start_data
    } ${this.#end_data} ${this.#quantity}`;
  }

  getPromotion() {
    return {
      name: this.#name,
      buy: this.#buy,
      get: this.#get,
      start_data: this.#start_data,
      end_data: this.#end_data,
      quantity: this.#quantity,
    };
  }
}

export default Promotion;
