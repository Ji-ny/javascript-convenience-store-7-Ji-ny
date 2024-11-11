import { Console, DateTimes } from "@woowacourse/mission-utils";
import Product from "../Model/Product.js";
import Promotion from "../Model/Promotion.js";
import { InputView } from "../View/InputView.js";
import { OutputView } from "../View/OutputView.js";
import { readFile } from "./fileFunctions.js";
import { getDateDiff } from "./dateFunctios.js";
import BuyProduct from "../Model/BuyProduct.js";

class Shop {
  async start() {
    // let noPromosionTotalAmount = 10000; // TODO 프로모션 제외한 가격을 추후 구해야 한다.
    let finalAmount = 0; // 내실 돈
    // let promotionDiscountPrice = 0; // 프로모션 할인 가격
    let promotionGetProducts = []; // 프로모션으로 증정 상품 배열.

    const productDatas = this.createProductDatas();
    const promotionDatas = this.createPromotionDatas();
    OutputView.printProducts(productDatas);

    let buyProducts = await InputView.readBuyItem(); // 구매할 아이템 입력 [{name : 상품명, quantity : 개수Number}]

    const { totalAmount, totalQuantity } = this.calculateTotalAmount(
      buyProducts,
      productDatas
    );

    // * 프로모션
    const { promotionDiscountPrice, noPromosionTotalAmount } =
      this.calculatePromotionTotalAmount(
        productDatas,
        buyProducts,
        promotionDatas,
        promotionGetProducts
      );

    // * 멤버쉽
    const isMemberShipYesOrNo = await InputView.membershipInput();
    const membershipDiscountPrice = this.calculateMemberShipTotalAmount(
      noPromosionTotalAmount,
      isMemberShipYesOrNo
    );

    // Console.print(noPromosionTotalAmount, membershipDiscountPrice);

    // Console.print(`${totalAmount}원, ${totalQuantity}개`);

    OutputView.printReceipt(
      buyProducts,
      totalAmount,
      totalQuantity,
      membershipDiscountPrice,
      promotionDiscountPrice, // 포로모션으로 얻는 가격
      promotionGetProducts // 프로모션으로 얻는 상품들 (BuyProduct )
    );
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

  calculateTotalAmount = (buyProducts, productDatas) => {
    let totalAmount = 0;
    let totalQuantity = 0;

    // * 우선 구매할 상품. 총 가격
    buyProducts.forEach((buyProduct) => {
      // * 프로모션 상품이 없으면 일반 상품
      // 구매한 상품 찾기
      const product = productDatas.find(
        (product) =>
          product.getProduct().name === buyProduct.getBuyProduct().name // 제품 명과 구매할 제품명이 같은 것의 가격을 찾는다.
      );

      if (product) {
        // 구매할 상품을 찾은 경우 ,
        // 상품 가격 계산 -> 프로모션 먼저 찾는다.
        let productTotal =
          Number(product.getProduct().price) *
          Number(buyProduct.getBuyProduct().quantity);
        buyProduct.setPrice(product.getProduct().price); // 구매할 상품의 기본 가격에 넣어줌.\
        buyProduct.setTotalPrice(productTotal); // 해당 상품의 상품 총 가격도 넣어줌.

        totalAmount += Number(productTotal);
        totalQuantity += Number(buyProduct.getBuyProduct().quantity);
      }
    });

    // Console.print(`총 합 : ${totalAmount}원`);

    return { totalAmount, totalQuantity };
  };

  // 멤버심 프로모션 금액 결과 저장
  calculateMemberShipTotalAmount(noPromosionTotalAmount, isMemberShipYesOrNo) {
    let membershipDiscountPrice = 0;

    const maxDiscountPrice = 8000;
    if (isMemberShipYesOrNo === "Y") {
      // 멤버십 회원은 프로모션 적용 후 남은 금액에 대해 멤버십 할인을 적용한다.
      membershipDiscountPrice = noPromosionTotalAmount * 0.3;

      if (membershipDiscountPrice >= maxDiscountPrice) {
        membershipDiscountPrice = 8000; // 8000원을 넘기면 return
      }
    }

    return membershipDiscountPrice;
  }

  // 포로모션 구하기
  //promotionGetProducts : 프로모션 증정 제품 저장
  // promotionDiscountPrice : 프로모션 행사할인 값
  calculatePromotionTotalAmount(
    productDatas,
    buyProducts,
    promotionDatas,
    promotionGetProducts
  ) {
    let promotionDiscountPrice = 0; // 프로모션으로 할인 받는 값
    let noPromosionTotalAmount = 0; // 프로모션 안하는 상품들만 토탈

    buyProducts.forEach((buyProduct) => {
      // * 구매할 수 있는 프로모션 상품 찾기
      const promotionProduct = productDatas.find(
        (product) =>
          product.getProduct().name === buyProduct.getBuyProduct().name &&
          product.getProduct().promotion != "null" // 제품 명과 구매할 제품명이 같고, 프로모션 의 가격을 찾는다.
      );

      if (promotionProduct) {
        Console.print(`프로모션 상품 발견 : ${promotionProduct.toString()}`);
        // 구매할 상품을 찾은 경우 ,
        // 상품 가격 계산 -> 프로모션 먼저 찾는다.

        // 프로모션 데이터를 찾는다.
        const promotion = promotionDatas.find(
          (
            promotion // 프로모션 명과, 내가 찾은 프로모션 데이터의 프로모션 찾기
          ) =>
            promotion.getPromotion().name ===
            promotionProduct.getProduct().promotion
        );

        if (promotion) {
          Console.print(`프로모션 발견 : ${promotion.toString()}`);
          // * 프로모션 날짜가 현재 기간인지 확인한다. 아니면 그냥 계산 안한다.
          const nowDate = new Date(DateTimes.now());
          const start_data = promotion.getPromotion().start_data;
          const end_data = promotion.getPromotion().end_data;

          // Console.print(
          //   `오늘날짜 ${nowDate}, 프로모션 시작일 ${start_data}, 프로모션 종료일 ${end_data}`
          // );
          // Console.print(getDateDiff(start_data, nowDate));
          // Console.print(getDateDiff(end_data, nowDate));

          if (
            getDateDiff(start_data, nowDate) < 0 &&
            getDateDiff(end_data, nowDate) >= 0
          ) {
            // * 현재 프로모션 기간이라면 프로모션을 계산한다.
            Console.print("해당 상품은 프로모션 기간입니다!");
            // 몇개까지 해당 상품을 증정받을 수 있는지 구한다.
            const getPromotionProductCount =
              parseInt(
                buyProduct.getBuyProduct().quantity /
                  promotion.getPromotion().buy
              ) * promotion.getPromotion().get;
            const nowGetPromotionProductDiscountPrice =
              getPromotionProductCount * buyProduct.getBuyProduct().price; // 할인받을 수 있는 가격
            Console.print(
              `몇개까지 증정 가능 ? ${getPromotionProductCount}개, 얼마 이득? ${nowGetPromotionProductDiscountPrice}원`
            );

            promotionDiscountPrice += nowGetPromotionProductDiscountPrice; // 프로모션으로 할인받는 가격을 저장한다.
            // let productTotal =
            //   Number(promotionProduct.getProduct().price) *
            //   Number(buyProduct.getBuyProduct().quantity);
            // buyProduct.setPrice(promotionProduct.getProduct().price); // 구매할 상품의 기본 가격에 넣어줌.\
            // buyProduct.setTotalPrice(productTotal); // 해당 상품의 상품 총 가격도 넣어줌.
            // *프로모션으로 얻는 상품 배열 : promotionGetProducts
            promotionGetProducts.push(
              new BuyProduct(
                buyProduct.getBuyProduct().name,
                getPromotionProductCount,
                buyProduct.getBuyProduct().price,
                nowGetPromotionProductDiscountPrice
              )
            );

            // * 프로모션으로 얻는 상품 개수 만큼 buyProduct에 구매 개수를 추가해준다.
            buyProduct.setQuantity(
              buyProduct.getBuyProduct().quantity + getPromotionProductCount
            );
            // * 프로모션으로 얻는 상품 개수만큼 buyProduct에 토탈 구매 가격을 계산해준다.
            buyProduct.setTotalPrice(
              buyProduct.getBuyProduct().totalPrice +
                nowGetPromotionProductDiscountPrice
            );
            // Console.print(promotionGetProducts[0].toString());
          }
        }
      } else {
        noPromosionTotalAmount += buyProduct.getBuyProduct().totalPrice; // 프로모션으로 계산 안하는 친구들 저장
      }
    });
    return { promotionDiscountPrice, noPromosionTotalAmount }; // 반환 : 프로모션 할인 값, 프로모션 할인을 제외한 값
  }
}

export default Shop;
// new Shop().start();
