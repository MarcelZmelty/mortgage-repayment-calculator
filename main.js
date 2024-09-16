document.addEventListener('DOMContentLoaded', ()=> {


const form = document.querySelector('.form')
const mortgageAmount = document.getElementById('mortgage-amount')
const mortgageTerm = document.getElementById('mortgage-term')
const interestRate = document.getElementById('interest-rate')
const yourResultMonthly = document.querySelector('.repay-box__amount--monthly')
const yourResultOverTheTerm = document.querySelector('.repay-box__amount--over-the-term')
const defaultView = document.querySelector('.default-view')
const resultView = document.querySelector('.result-view')

mortgageAmount.addEventListener('keyup', function() {
    const rawValue = this.value;
    const cleanedValue = rawValue.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.value = formattedValue;
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    calcResult();
    formValidation();
})

const setError = (element, message) => {
    const inputBox = element.closest('.form__input-box')
    const errorMessageField = inputBox.querySelector('.form__error-description')
    const errorBox = inputBox.querySelector('.form__error-box')
    errorMessageField.textContent = message
    errorBox.classList.add('visible')
    setNone()
}

const setSuccess = (element) => {
    const inputBox = element.closest('.form__input-box')
    const errorBox = inputBox.querySelector('.form__error-box')
    errorBox.classList.remove('visible')
}

const setNone = () => {
    yourResultMonthly.textContent = ''
    yourResultOverTheTerm.textContent = ''
}

const formValidation = () => {
    const mortgageAmountValue = mortgageAmount.value;
    const mortgageTermValue = mortgageTerm.value;
    const interestRateValue = interestRate.value;

    if(mortgageAmountValue === ''){
        setError(mortgageAmount, `This field can't be empty`)
    }else{
        setSuccess(mortgageAmount)
    }

    if(mortgageTermValue === ''){
        setError(mortgageTerm, `This field can only cantain number`)
    }else if(!/^\d+$/.test(mortgageTermValue)){
        setError(mortgageTerm, 'This field must be number')
    }else{
        setSuccess(mortgageTerm)
    }

    if(interestRateValue === ''){
        setError(interestRate, `This field can't be empty`)
    }else if(!/^\d+$/.test(interestRateValue)){
        setError(interestRate, 'This field must be number')
    }else{
        setSuccess(interestRate)
    }
}





const calcResult = () => {
    const amount = mortgageAmount.value.replace(/\D/g, '');
    const years = mortgageTerm.value;
    const percent = interestRate.value;

    let number =(amount * (percent / 100 / 12 * Math.pow(1 + percent / 100 / 12, years * 12)) / (Math.pow(1 + percent / 100 / 12, years * 12) - 1)).toFixed(2); 
    let currencyFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    });
    
    yourResultMonthly.textContent = "£"  +  currencyFormatter.format(number)
    yourResultMonthly.classList.add('slide')
    yourResultOverTheTerm.textContent = "£"  + currencyFormatter.format(number * (years * 12))
    defaultView.classList.add('unvisible')
    resultView.classList.add('visible')
};

})