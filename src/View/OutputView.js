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

    const checkNull = (promotion) => {
      if (promotion == "null") {
        return "";
      }
      return promotion;
    };

    productDatas.forEach((product) => {
      MissionUtils.Console.print(
        `- ${product.getProduct().name} ${product
          .getProduct()
          .price.toLocaleString("ko-KR")}원 ${checkQuantityZero(
          product.getProduct().quantity
        )} ${checkNull(product.getProduct().promotion)}`
      );
    });

    Console.print("");

    // ...
  },

  // 총 구매 물건, 총 가격, 총 수량, 멤버십 할인 가격
  printReceipt(
    buyProducts,
    totalAmount,
    totalQuantity,
    membershipDiscountPrice,
    promotionDiscountPrice, // 포로모션으로 얻는 가격 (행사할인)
    promotionGetProducts // 프로모션으로 얻는 상품들 (BuyProduct )
  ) {
    MissionUtils.Console.print(`
        ==============W 편의점================
        상품명		수량	금액
${buyProducts
  .map((buyProduct) => {
    const buyProductItem = buyProduct.getBuyProduct();
    return `        ${buyProductItem.name}		${
      buyProductItem.quantity
    } 	${buyProductItem.totalPrice.toLocaleString("ko-KR")}`;
  })
  .join("\n")}
        =============증	정===============
${promotionGetProducts
  .map((promotionGetProduct) => {
    const promotionGetProductItem = promotionGetProduct.getBuyProduct();
    return `        ${promotionGetProductItem.name}		${promotionGetProductItem.quantity}`;
  })
  .join("\n")}
        ====================================
        총구매액		${totalQuantity}	${totalAmount.toLocaleString("ko-KR")}
        행사할인			-${promotionDiscountPrice.toLocaleString("ko-KR")}
        멤버십할인			-${membershipDiscountPrice.toLocaleString("ko-KR")}
        내실돈			 9,000`);
  },
  // ...
};
