/**
 * Finds all possible combinations of operands that can be applied to the given numbers to reach the target value.
 *
 * @param {number[]} numbers - An array of numbers to be used in the calculations.
 * @param {number} target - The target value to be achieved by applying the operands.
 * @param {string[]} [operands=['+', '-', '*', '/']] - An array of operand strings representing the operations to be used.
 * The supported operations are:
 * - '+' for addition
 * - '-' for subtraction
 * - '*' for multiplication
 * - '/' for division
 * - '^' for exponentiation (e.g., 2 ^ 3 = 8)
 * - '||' for concatenation (e.g., 1 || 2 = 12)
 *
 * @returns {Array} An array of solutions where each solution is a combination of operands that result in the target value.
 */
export const findOperands = (numbers, target, operands = ['+', '-', '*', '/']) => {
  const solutions = [];
  const arithmicNumbers = numbers.map((x) => parseInt(x));
  const targetNumber = parseInt(target);

  solutions.push(...findOperandsRecursive(arithmicNumbers, targetNumber, operands));
  return solutions;
};

/**
 * Recursively finds all possible combinations of operands that can be applied to the given numbers to reach the target value.
 *
 * @param {number[]} numbers - An array of numbers to be used in the calculations.
 * @param {number} target - The target value to be achieved by applying the operands.
 * @param {string[]} operands - An array of operand strings representing the operations to be used.
 * @param {string[]} [currentOps=[]] - An array of current operand strings being used in the recursive calls.
 * @param {Array} [solutions=[]] - An array to store the solutions found.
 * @returns {Array} An array of solutions where each solution is a combination of operands that result in the target value.
 */
const findOperandsRecursive = (numbers, target, operands, currentOps = [], solutions = []) => {
  if (currentOps.length === numbers.length - 1) {
    const result = evaluateLeftToRight(numbers, currentOps);
    if (result !== null && Math.abs(result - target) < 1e-6) {
      const expression = numbers[0] + currentOps.map((op, i) => ` ${op} ${numbers[i + 1]}`).join('');
      solutions.push(expression);
    }
    return solutions;
  }

  for (const op of operands) {
    currentOps.push(op);
    findOperandsRecursive(numbers, target, operands, currentOps, solutions);
    currentOps.pop();
  }

  return solutions;
};

/**
 * Evaluates a sequence of numbers and operations from left to right.
 *
 * @param {number[]} nums - An array of numbers to be used in the calculations.
 * @param {string[]} ops - An array of operand strings representing the operations to be applied between the numbers.
 * @returns {number|null} The result of the evaluation or null if an invalid operation (e.g., division by zero) occurs.
 */
const evaluateLeftToRight = (nums, ops) => {
  return ops.reduce((result, op, index) => {
    const nextNum = nums[index + 1];
    const calculated = calculate(result, nextNum, op);
    if (calculated === null) return null;
    return calculated;
  }, nums[0]);
};

/**
 * Performs a calculation based on the provided operator.
 *
 * @param {number} a - The first operand.
 * @param {number} b - The second operand.
 * @param {string} operator - The operator to apply. Supported operators are '+', '-', '*', '/', '^', '||', '%', and '&&'.
 * @returns {number|null} The result of the calculation, or null if division by zero is attempted.
 * @throws {Error} Throws an error if an invalid operator is provided.
 */
const calculate = (a, b, operator) => {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : null;
    case '^':
      return Math.pow(a, b);
    case '||':
      return parseInt(`${a}${b}`);
    case '%':
      return b !== 0 ? a % b : null;
    case '&&':
      return a && b;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
};
