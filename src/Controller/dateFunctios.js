import { Console, DateTimes } from "@woowacourse/mission-utils";

// Console.print(DateTimes.now());
// 일 차이 구하기
export const getDateDiff = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date1.getTime() - date2.getTime();

  return diffDate / (1000 * 60 * 60 * 24);
  // Math.abs()를 사용하는 이유는 d1, d2의 순서가 바뀌어 음수가 나올 때도 양수로 변환시켜 주기 위함이다.
};

// const date = new Date(DateTimes.now()); // date로 변환
// Console.print(date);

// Console.print(getDateDiff("2024-11-01", date));
// Console.print(getDateDiff("2024-11-30", date));

// 시작일보다 크고, 종료일보다 작아야 한다.
// 시작일 - 현재일 = (-)
// 종료일 - 현재일 = +
