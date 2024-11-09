import { MissionUtils } from "@woowacourse/mission-utils";

const InputView = {
  async readItem() {
    const input = await MissionUtils.Console.readLineAsync(
      "구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])"
    );
    // ...
  },

  async promotionAddInput({ 상품명 = "에너지바" }) {
    const input = await MissionUtils.Console.readLineAsync(
      `question = 현재 ${상품명}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`
    );
  },

  async promotionAddInput({ 상품명 = "에너지바", 수량 = "수량" }) {
    const input = await MissionUtils.Console.readLineAsync(
      `현재 ${상품명} ${수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`
    );
  },

  async membershipInput() {
    const input = await MissionUtils.Console.readLineAsync(
      `멤버십 할인을 받으시겠습니까? (Y/N)`
    );
  },

  async reStartInput() {
    const input = await MissionUtils.Console.readLineAsync(
      `감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)`
    );
  },
  // ...
};
