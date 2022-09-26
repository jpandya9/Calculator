class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        // convert currentOperand to string and get the last value of the string and slice it off.(0, -1) means to take index 0 to 1 from the end. This will take everything in the string and take it off the last one.
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return // This is done so that the '.' doesn't appear more than once.
        this.currentOperand = this.currentOperand.toString() + number.toString() // Coverting the numbers to strings so that they're concatanated instead of added bc of the '+' when they're displayed.
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return // Check in to stop the operations working without a numerical input.
        if (this.previousOperand !== '') {
            this.compute()
        } // Check in to make sure all the computations are are done (eg. if the top says 2 * and bottom says 3, it will do that) and all operand values are where they need to be.
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '' // This is to move the current input UP to the top so the currentOperand becomes the previousOperand and the currentOperand (bottom) is left empty.
    }

    compute() {
        let computation // Result of compute function
        const prev = parseFloat(this.previousOperand) // previous variable which is going to be number version of previous operand. parseFloat converts a string to a floating point number (decimal). 
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return // check in placed here to make sure that if nothing is entered by user and equals is pressed, we don't want anything to run.
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        } // switch statement is similar to loads of if statements chained after each other. they allow you to do loads of if statements on a single object. In this, case = "if" and default = "else"

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString() // we want a string here, so we can then split it on the decimal side of it.
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // This will turn the string into an array. The first part of the array will be the part before the '.' and the second will be the part after.
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    } 

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '' // This will make it so that the previous operand value will clear itself.
        } // ^ This will make it so that when we write a number and then press an operation, when it all goes to the top, it will show up with the number. So instead of 23 going up even when we press 23 +, it will say 23 + on the top and then we can add in a second number. 
    }
}

// ^^ Putting constructor inside which is going to take all the inputs as well as all the functions for our calculator. Line 2
// Constructor is going to take previous operand and current operand text element so we can know where to place our display text for our calculator. Line 2
// The elements inside the constructor is so that we can set these text elements inside the calculator class. Lines 3-4
// Next, we need to think about the operations the calculator can do. So we need to define some of those functions in the calculator class. Line 6 onwards
// Line 6 => Clear means to clear out our different variables. Line 10 => Delete means to remove a single number. Line 14 => appendNumber is what will happen every time a number is clicked to add to the screen. Line 18 => chooseOperation is when a user clicks any of the operations. Line22 => Compute which is just going to take calculator values and compute single value for what we need to be displayed. Line 26 => updateDisplay is going to update vlaues inside our output. 

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
// ^ queryselectorall is going to get us all elements that match a certain string.

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}) // This is done for the number buttons

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}) // This is done for the operation buttons

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
// Computation

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
// All clear function: clears out whatever you need to. 'AC'

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
// Delete function

// At this point, the calculator is fully functional at the most basic level. 