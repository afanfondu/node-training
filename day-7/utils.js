export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

let uniqueId = 1;
export const generateName = () => {
  const names = [
    "Alex",
    "Sam",
    "Jamie",
    "Taylor",
    "Jordan",
    "Casey",
    "Riley",
    "Sky",
    "Peyton",
    "Devin",
  ];
  return `${getRandomElement(names)}-${uniqueId++}`;
};
