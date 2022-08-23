/// CARDHOLDER NAME
let nameCard = document.querySelector(".card-detail-name");
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector(".form-cardholder-error");

/// CARD NUMBER
let numberCard = document.querySelector(".card-number");
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector(".form-cardNumber-error");

// MM
let monthCard = document.querySelector('.card-month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form-input-mm--error');

// YY
let yearCard = document.querySelector(".card-year");
let yearInput = document.querySelector("#cardYear");
let yearErrorDiv = document.querySelector(".form-input-yy--error");


// CVC
let cvcCard = document.querySelector(".card-back-cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcErrorDiv = document.querySelector(".form-input-cvc--error");


// Ingreso dinámico del nombre
nameInput.addEventListener('input', ()=>{
    /* console.log('Ingrese un nombre'); -> muestra en consola y se incrementa el contador de ella*/
    /* console.log(nameInput.value); -> muestra en consola cada entrada de input que le damos*/
    if(nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED';
    }else{ 
        validateNumbersAndChar(nameInput, nameErrorDiv);
        nameCard.innerText = nameInput.value;
    }
});

// Ingreso dinámico del número
numberInput.addEventListener('input', ()=>{
  /* Creamos una expresión regular regExp que es un objeto en JS. Escribiendo /[a-z]/ va a buscar todas
    las letras minúsculas, pero si escribo /[A-z]/ va a buscar mayus y minus. 
    Con la bandera g le indicamos que busque de forma global. */

  // Validando que haya una letra,
  let regExp = /[A-z]/g;
  const formato = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (regExp.test(numberInput.value) || formato.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, "Wrong format, numbers only");
    /* numberErrorDiv.innerText = 'Wrong format, numbers only'; */
  }else{
    // agregando espacios cada 4 dígitos, borrando espacios ingresados por el usuario
    numberInput.value = numberInput.value
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();
    showError(numberInput, numberErrorDiv, "", false);
    /* numberErrorDiv.innerText = ""; */

    // Notas:
    // .replace(/\s/g, '') -> si detecta un espacio por teclado, no lo acepta
    // .replace(/([0-9]{4})/g, "$1 ") -> cuenta hasta 4 y agrega un espacio
    // .trim() -> para borrar el último espacio
  }

  // Actualizando gráficamente la tarjeta
  numberCard.innerText = numberInput.value;

  // Mostrando los 0s por defecto cuando no se ha ingresado nada
  if (numberInput.value == "") {
    numberCard.innerText = "0000 0000 0000 0000";
  }
});

// Ingreso dinámico del mes
monthInput.addEventListener('input', ()=>{
    monthCard.innerText = monthInput.value;
    
    validateLettersAndChar(monthInput, monthErrorDiv);
});

// Ingreso dinámico del año
yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLettersAndChar(yearInput, yearErrorDiv);
});

// Ingreso dinámico del cvc
cvcInput.addEventListener('input', ()=>{
    cvcCard.innerText = cvcInput.value;
    validateLettersAndChar(cvcInput, cvcErrorDiv);
});

// Botón confirm
let confirmButton = document.querySelector('.form-submit');

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones Formulario y Thanks
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmButton.addEventListener('click', event=>{
    event.preventDefault();

    // Validar nombre
    if(verifyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    }else{
        nameValidation = false;
    }

    // Validar número
    if(verifyIsFilled(numberInput, numberErrorDiv)){
        if(numberInput.value.length == 19){
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }

    // Validar mes
    if(verifyIsFilled(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value)<= 12){
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        }else{
            showError(monthInput, monthErrorDiv, 'Wrong month');
            monthValidation = false;
        }
    }

    // Validar año
    if(verifyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27){
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        }else{
            showError(yearInput, yearErrorDiv, 'Wrong year');
            yearValidation = false;
        }
    }

    // Validar cvc
    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3){
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, 'Wrong cvc');
            cvcValidation = false;
        }
    }

    if((nameValidation == true) && (numberValidation == true) && (monthValidation == true) && (yearValidation == true) && (cvcValidation == true)){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});

// Funciones
function showError(divInput, divError, msgError, show=true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = "#FF0000";
    }else{
        divError.innerText = msgError;
        divInput.style.borderColor = "hsl(270, 3%, 87%)";
    }
}

function verifyIsFilled(divInput, divError){
    if(divInput.value.length > 0){
        showError(divInput, divError, "", false);
        return true;
    }else{
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}

// Validando que no haya letras ni caracteres especiales
function validateLettersAndChar(input, divError){
    let regExp = /[A-z]/g;
    const formato = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (regExp.test(input.value) || formato.test(input.value)) {
      showError(input, divError, "Wrong format, numbers only");
    } else {
      showError(input, divError, "", false);
    }
}

// Validando que no haya números ni caracteres especiales
function validateNumbersAndChar(input, divError) {
  let regExp2 = /[0-9]/g;
  const formato = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (regExp2.test(input.value) || formato.test(input.value)) {
    showError(input, divError, "Wrong format, letters only");
  } else {
    showError(input, divError, "", false);
  }
}

