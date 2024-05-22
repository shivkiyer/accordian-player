/**
 * Introduces a wait in a test
 *
 * @param {number} milliseconds Wait time (optional) - default 100 ms
 *
 * @returns
 */
export default function wait(milliseconds) {
  if (!milliseconds) {
    milliseconds = 100;
  }
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
