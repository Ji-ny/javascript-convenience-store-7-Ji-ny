import { Console } from "@woowacourse/mission-utils";
import Product from "../Model/Product.js";
import Promotion from "../Model/Promotion.js";
import { InputView } from "../View/InputView.js";
import { OutputView } from "../View/OutputView.js";
import { readFile } from "./fileFunctions.js";

class Shop {
  async start() {
    const productDatas = this.createProductDatas();
    const promotionDatas = this.createPromotionDatas();
    OutputView.printProducts(productDatas);

    let buyProducts = await InputView.readBuyItem(); // 구매할 아이템 입력 [{name : 상품명, quantity : 개수Number}]

    const { totalAmount, totalQuantity } = this.calculateTotalAmount(
      buyProducts,
      productDatas,
      promotionDatas
    );

    Console.print(`${totalAmount}원, ${totalQuantity}개`);

    OutputView.printReceipt(buyProducts, totalAmount, totalQuantity);
    // 계산을 하자.
  }

  createProductDatas = () => {
    const fileData = readFile("public/products.md");
    let productDatas = [];
    for (let i = 1; i < fileData.length - 1; i++) {
      productDatas.push(
        new Product(
          fileData[i][0],
          fileData[i][1],
          fileData[i][2],
          fileData[i][3]
        )
      );
    }
    return productDatas;
  };

  createPromotionDatas = () => {
    const fileData = readFile("public/promotions.md");
    let promotionDatas = [];
    for (let i = 1; i < fileData.length - 1; i++) {
      promotionDatas.push(
        new Promotion(
          fileData[i][0],
          fileData[i][1],
          fileData[i][2],
          fileData[i][3],
          fileData[i][4]
        )
      );
    }
    return promotionDatas;
  };

  calculateTotalAmount = (buyProducts, productDatas, promotionDatas) => {
    let totalAmount = 0;
    let totalQuantity = 0;

    // * 우선 구매할 상품. 총 가격
    buyProducts.forEach((buyProduct) => {
      // 구매한 상품 찾기
      const product = productDatas.find(
        (product) =>
          product.getProduct().name === buyProduct.getBuyProduct().name // 제품 명과 구매할 제품명이 같은 것의 가격을 찾는다.
      );

      if (product) {
        // 구매할 상품을 찾은 경우 ,
        // 상품 가격 계산
        let productTotal =
          Number(product.getProduct().price) *
          Number(buyProduct.getBuyProduct().quantity);
        buyProduct.setPrice(product.getProduct().price); // 구매할 상품의 기본 가격에 넣어줌.\
        buyProduct.setTotalPrice(productTotal); // 해당 상품의 상품 총 가격도 넣어줌.

        totalAmount += Number(productTotal);
        totalQuantity += Number(buyProduct.getBuyProduct().quantity);
      }
    });

    Console.print(`총 합 : ${totalAmount}원`);

    return { totalAmount, totalQuantity };
  };
}

export default Shop;
// new Shop().start();
