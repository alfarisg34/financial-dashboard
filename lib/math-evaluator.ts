/**
 * Math Evaluator Utility
 * Evaluates arithmetic expressions safely without `eval()`, strictly following
 * standard mathematical precedence (multiplication & division before addition & subtraction).
 * 
 * Supports:
 * - Operators: +, -, *, /, x, ×, ÷, :
 * - Parentheses: (, )
 * - Thousand separators in Indonesian format (e.g., 50.000 + 20.000 * 2 -> 90000)
 */

export interface MathEvalResult {
  result: number | null
  formattedResult: string | null
  error: string | null
}

function formatThousands(value: number): string {
  if (isNaN(value) || !isFinite(value)) return ''
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)
}

export function evaluateExpression(expr: string): MathEvalResult {
  if (!expr || !expr.trim()) {
    return { result: null, formattedResult: null, error: null }
  }

  try {
    // 1. Sanitize & Normalize expression
    let cleaned = expr.trim()
    
    // Replace visual multiplication and division symbols
    cleaned = cleaned.replace(/×|x|X/g, '*')
    cleaned = cleaned.replace(/÷|:/g, '/')
    
    // Handle Indonesian thousand separator dots:
    // If a number token has dots like 100.000 or 1.500.000, remove dots.
    // Replace commas used as decimal separators with dots.
    // To safely remove thousand separator dots, we match sequences of digits and dots.
    cleaned = cleaned.replace(/(\d[\d.]*\d|\d)/g, (match) => {
      // If match contains commas, convert comma to dot (decimal)
      if (match.includes(',')) {
        return match.replace(/\./g, '').replace(',', '.')
      }
      // If match contains dots, treat dots as thousand separators if it fits IDR format
      // e.g. 50.000 -> 50000, 1.250.000 -> 1250000
      if (match.includes('.')) {
        const parts = match.split('.')
        // If all parts after the first have length of 3 (or standard thousand separator pattern)
        const isThousandPattern = parts.length > 1 && parts.slice(1).every(p => p.length === 3)
        if (isThousandPattern) {
          return match.replace(/\./g, '')
        } else if (parts.length === 2 && parts[1].length !== 3) {
          // It's a decimal dot like 12.5
          return match
        } else {
          return match.replace(/\./g, '')
        }
      }
      return match
    })

    // Tokenize
    const tokens: string[] = []
    let i = 0
    while (i < cleaned.length) {
      const char = cleaned[i]

      if (/\s/.test(char)) {
        i++
        continue
      }

      if (['+', '-', '*', '/', '(', ')'].includes(char)) {
        // Handle unary minus (negative numbers) e.g., -5 or (-5) or 10 + -5
        if (char === '-') {
          const prevToken = tokens[tokens.length - 1]
          if (tokens.length === 0 || ['+', '-', '*', '/', '('].includes(prevToken)) {
            // Unary minus: attach to next number
            let numStr = '-'
            i++
            while (i < cleaned.length && (/[\d.]/.test(cleaned[i]))) {
              numStr += cleaned[i]
              i++
            }
            if (numStr === '-') {
              return { result: null, formattedResult: null, error: 'Format minus tidak valid' }
            }
            tokens.push(numStr)
            continue
          }
        }
        tokens.push(char)
        i++
      } else if (/[\d.]/.test(char)) {
        let numStr = ''
        while (i < cleaned.length && (/[\d.]/.test(cleaned[i]))) {
          numStr += cleaned[i]
          i++
        }
        tokens.push(numStr)
      } else {
        // Invalid character
        return { result: null, formattedResult: null, error: `Karakter tidak dikenal: ${char}` }
      }
    }

    if (tokens.length === 0) {
      return { result: null, formattedResult: null, error: null }
    }

    // 2. Shunting-yard Algorithm (Infix -> RPN)
    const precedence: Record<string, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    }

    const outputQueue: string[] = []
    const operatorStack: string[] = []

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        outputQueue.push(token)
      } else if (['+', '-', '*', '/'].includes(token)) {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          outputQueue.push(operatorStack.pop()!)
        }
        operatorStack.push(token)
      } else if (token === '(') {
        operatorStack.push(token)
      } else if (token === ')') {
        let foundLeftParen = false
        while (operatorStack.length > 0) {
          const top = operatorStack.pop()!
          if (top === '(') {
            foundLeftParen = true
            break
          }
          outputQueue.push(top)
        }
        if (!foundLeftParen) {
          return { result: null, formattedResult: null, error: 'Tanda kurung tidak seimbang' }
        }
      }
    }

    while (operatorStack.length > 0) {
      const top = operatorStack.pop()!
      if (top === '(' || top === ')') {
        return { result: null, formattedResult: null, error: 'Tanda kurung tidak seimbang' }
      }
      outputQueue.push(top)
    }

    // 3. Evaluate RPN
    const evalStack: number[] = []
    for (const token of outputQueue) {
      if (!isNaN(Number(token))) {
        evalStack.push(Number(token))
      } else {
        if (evalStack.length < 2) {
          return { result: null, formattedResult: null, error: 'Ekspresi tidak lengkap' }
        }
        const b = evalStack.pop()!
        const a = evalStack.pop()!

        let res = 0
        switch (token) {
          case '+': res = a + b; break
          case '-': res = a - b; break
          case '*': res = a * b; break
          case '/':
            if (b === 0) {
              return { result: null, formattedResult: null, error: 'Tidak dapat membagi dengan 0' }
            }
            res = a / b
            break
        }
        evalStack.push(res)
      }
    }

    if (evalStack.length !== 1) {
      return { result: null, formattedResult: null, error: 'Ekspresi tidak valid' }
    }

    const finalResult = Math.round(evalStack[0] * 100) / 100
    return {
      result: finalResult,
      formattedResult: formatThousands(finalResult),
      error: null
    }
  } catch (err: any) {
    return { result: null, formattedResult: null, error: 'Gagal mengevaluasi matematika' }
  }
}

/**
 * Checks if the string contains any mathematical operator
 */
export function hasMathOperators(val: string): boolean {
  return /[+\-*\/xX×÷:]/.test(val)
}
