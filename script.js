const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-opration]');
const all_clear = document.querySelector('[data-all-clear]');
const del = document.querySelector('[data-delete]');
const equels = document.querySelector('[data-equals]');
const prev_oprand_text_element = document.querySelector('[data-prev-oprand]');
const curr_oprand_text_element = document.querySelector('[data-curr-oprand]');
class Calculator {
    constructor(prev_oprand_text_element, curr_oprand_text_element) {
        this.prev_oprand_text_element = prev_oprand_text_element;
        this.curr_oprand_text_element = curr_oprand_text_element;
        this.clear();
    }

    clear(){
        this.curr_oprand = "";
        this.prev_oprand = "";
        this.operation = undefined;

    }

    delete(){
        this.curr_oprand = this.curr_oprand.toString().slice(0, -1);
    }

    append_number(number){
        if (number === '.' && this.curr_oprand.toString().includes('.')) return;
        this.curr_oprand = this.curr_oprand.toString() + number.toString();
    }

    choose_operation(operation) {
        if (this.curr_oprand === '') return;
        if (this.prev_oprand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prev_oprand = this.curr_oprand;
        this.curr_oprand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prev_oprand);
        const curr = parseFloat(this.curr_oprand);
        if(isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            
            default:
                return;
        }

        this.curr_oprand = computation;
        this.operation = undefined;
        this.prev_oprand = '';
    }

    update_display() {
        this.curr_oprand_text_element.innerText = this.get_display_number(this.curr_oprand);
        if(this.operation != null){
            this.prev_oprand_text_element.innerText = `${this.get_display_number(this.prev_oprand)} ${this.operation}`
        }else {
            this.prev_oprand_text_element.innerText = "";
        }
    }
    
    get_display_number(number) {
        const string_number = number.toString();
        const integer_digits = parseFloat(string_number.split(".")[0]);
        const decimal_digits = string_number.split(".")[1];
        let integet_display;
        if(isNaN(integer_digits)){
            integet_display = '';
        }else{
            integet_display = integer_digits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        
        if(decimal_digits != null) {
            return `${integet_display}.${decimal_digits}`;
        }else{
            return integet_display;
        }
    }

}

const calculator = new Calculator(prev_oprand_text_element, curr_oprand_text_element);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append_number(button.innerText);
        calculator.update_display();
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choose_operation(button.innerText);
        calculator.update_display();
    })
})

equels.addEventListener('click', () => {
    calculator.compute();
    calculator.update_display();
})

all_clear.addEventListener('click', () => {
    calculator.clear();
    calculator.update_display();
})

del.addEventListener('click', () => {
    calculator.delete();
    calculator.update_display();
})