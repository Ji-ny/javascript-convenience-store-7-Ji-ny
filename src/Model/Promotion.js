import { Console, MissionUtils } from "@woowacourse/mission-utils";

class Promotion {
  #name;
  #buy;
  #get;
  #start_data;
  #end_data;

  constructor(name, buy, get, start_data, end_data, quantity) {
    this.#name = name;
    this.#buy = Number(buy);
    this.#get = Number(get);
    this.#start_data = start_data;
    this.#end_data = end_data;
  }

  toString() {
    return `promotion : ${this.#name} ${this.#buy} ${this.#get} ${
      this.#start_data
    } ${this.#end_data}`;
  }

  getPromotion() {
    return {
      name: this.#name,
      buy: this.#buy,
      get: this.#get,
      start_data: this.#start_data,
      end_data: this.#end_data,
    };
  }
}

export default Promotion;
