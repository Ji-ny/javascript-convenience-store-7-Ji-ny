import fs from "node:fs";
import Product from "../Model/Product.js";

export const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const fileData = data
      .toString()
      .split("\r\n")
      .map((item) => item.split(","));
    console.log(fileData);
    return fileData;
  } catch (err) {
    console.error(err);
  }
};
