export function setupCounter(element: HTMLButtonElement): void {
  let counter = 0;

  const setCounter = (count: number): void => {
    counter = count;
    element.textContent = `Count is ${String(counter)}`;
  };

  element.addEventListener('click', () => {
    setCounter(counter + 1);
  });

  setCounter(0);
}
