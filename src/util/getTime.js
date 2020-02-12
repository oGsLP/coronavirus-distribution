/**
 * @Author: XYF
 * @Created: 20/02/12 13:55
 * @Filename: getTime.js
 * @Function:
 */

export default function() {
  let date = new Date();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    strDate +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
