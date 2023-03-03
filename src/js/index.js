// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const btnGenerate = document.getElementById('button-generete');
const formGenerator = document.getElementById('form-generator');
const generatorValue = document.getElementById('generator-value');
const generatorLenght = document.getElementById('generator-length');
const generatorUppercase = document.getElementById('generator-uppercase');
const generatorLowercase = document.getElementById('generator-lowercase');
const generatorNumbers = document.getElementById('generator-numbers');
const generatorSymbols = document.getElementById('generator-symbols');
const password = document.getElementById('password');
const generatorError = document.getElementById('generator-error');
const generatorStrenghtValue = document.getElementById(
  'generator-strenght-value'
);
const generatorCopied = document.getElementById('generator-copied');
const generatorCopy = document.getElementById('generator-copy');
const mensajes = ['Too short', 'too weak ', 'Weak', 'Medium', 'Strength'];
let numberChecked = 1;
let names = [];

function strenght() {
  if (generatorLenght.value < 6 || numberChecked === 0) {
    generatorStrenghtValue.dataset.state = 'short';
    generatorStrenghtValue.textContent = 'Too short';
  } else if (generatorLenght.value > 5 && numberChecked === 4) {
    generatorStrenghtValue.dataset.state = 'strong';
    generatorStrenghtValue.textContent = mensajes[numberChecked];
  } else {
    generatorStrenghtValue.textContent = mensajes[numberChecked];
    generatorStrenghtValue.dataset.state = 'optimum';
  }
}

function checked(e) {
  const checkess = document.querySelectorAll('input:checked');
  numberChecked = checkess.length;
  strenght();
  names = checkess;
}

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function passwordLength() {
  generatorValue.textContent = generatorLenght.value;
  strenght();
}

function generatePassword(e) {
  if (numberChecked === 0 || generatorLenght.value < 6) {
    generatorError.classList.add('generator__error--active');
  } else {
    generatorError.classList.remove('generator__error--active');
    let passwordLength = generatorLenght.value;
    let passwordCharacters = '';
    let passwordContent = '';

    checked();
    const characters = {
      uppercase: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnñopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '$%&/!¡?¿#@|-_'
    };

    for (const element of names) {
      const charactersName = element.name;
      const charactersType = characters[charactersName];
      passwordCharacters += charactersType;
      passwordContent +=
        charactersType[randomNumber(0, charactersType.length - 1)];
    }

    const charactersLenght = passwordCharacters.length;

    for (let index = 0; index < passwordLength - numberChecked; index++) {
      passwordContent +=
        passwordCharacters[randomNumber(0, charactersLenght - 1)];
    }
    password.textContent = passwordContent;
  }
}

generatorUppercase.addEventListener('input', checked);
generatorLowercase.addEventListener('click', checked);
generatorNumbers.addEventListener('click', checked);
generatorSymbols.addEventListener('click', checked);
generatorLenght.addEventListener('input', passwordLength);

formGenerator.addEventListener('submit', e => {
  // el prevent al formulario al submit
  e.preventDefault();
  generatePassword(e);
});

generatorCopy.addEventListener('click', async event => {
  if (!generatorError.classList.contains('generator__error--active')) {
    try {
      const text = await navigator.clipboard.writeText(password.textContent);
      generatorCopied.classList.add('generator__copied--active');
      setTimeout(() => {
        generatorCopied.classList.remove('generator__copied--active');
      }, 800);
    } catch (error) {
      console.log(`Ocurrió un error: ${error}`);
    }
  }
});
