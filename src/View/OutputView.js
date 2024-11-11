import { Console, MissionUtils } from "@woowacourse/mission-utils";

export const OutputView = {
  printProducts(productDatas) {
    MissionUtils.Console.print(
      `안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n`
    );
    const checkQuantityZero = (quantity) => {
      if (quantity == 0) {
        return "재고 없음";
      }
      return `${quantity}개`;
    };

    productDatas.forEach((product) => {
      MissionUtils.Console.print(
        `- ${product.getProduct().name} ${product
          .getProduct()
          .price.toLocaleString("ko-KR")}원 ${checkQuantityZero(
          product.getProduct().quantity
        )} ${product.getProduct().promotion}`
      );
    });

    Console.print("");

    // ...
  },

  printReceipt() {
    MissionUtils.Console.print(`
        ==============W 편의점================
        상품명		수량	금액
        콜라		3 	3,000
        에너지바 		5 	10,000
        =============증	정===============
        콜라		1
        ====================================
        총구매액		8	13,000
        행사할인			-1,000
        멤버십할인			-3,000
        내실돈			 9,000`);
  },
  // ...
};
