export const random_rgba = (): string => {
  const n = Math.round(Math.random() * 6);
  let color = '';
  console.log('n', n);
  switch (n) {
    case 0:
      color = 'lightcoral';
      break;
    case 1:
      color = 'lightsalmon';
      break;
    case 2:
      color = 'lightblue';
      break;
    case 3:
      color = 'lightgreen';
      break;
    case 4:
      color = 'pink';
      break;
    case 5:
      color = 'yellow';
      break;
    case 6:
      color = 'lightcyan';
  }
  console.log('color', color);
  return color;
};
