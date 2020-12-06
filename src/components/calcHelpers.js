const calculate = (operation, x, y) => {
  switch (operation) {
    case '+':
      return x + y;

    case '-':
      return x - y;

    case '*':
      return x * y;

    case '/':
      return x / y;

    case '^':
      return x ** y;
  }
}

export const calculateFromAtoms = atom => {
  if (typeof (atom[1]) === 'number') {
    const result = calculate(atom[0], atom[1], atom[2]);
    return result;
  } else {
    return calculate(atom[0], calculateFromAtoms(atom[1]), atom[2]);
  }
}
