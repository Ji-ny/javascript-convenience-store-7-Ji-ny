import Product from "../Model/Product.js";
import Promotion from "../Model/Promotion.js";
import { InputView } from "../View/InputView.js";
import { OutputView } from "../View/OutputView.js";
import { readFile } from "./fileFunctions.js";

class Shop {
  start() {
    const productDatas = this.createProductDatas();
    const promotionDatas = this.createPromotionDatas();
    OutputView.printProducts(productDatas);

    const buyProducts = InputView.readBuyItem();
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
}

export default Shop;
// new Shop().start();
