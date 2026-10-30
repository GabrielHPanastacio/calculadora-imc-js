const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');

function calculateIMC() {
    // Substitui a vírgula por ponto para o JavaScript conseguir ler decimais (ex: 1,75 -> 1.75)
    const weightStr = weightInput.value.replace(',', '.');
    const heightStr = heightInput.value.replace(',', '.');

    const weight = parseFloat(weightStr);
    const height = parseFloat(heightStr);

    // Validação básica
    if (!weight || !height || weight <= 0 || height <= 0) {
        showResult("Por favor, insira valores válidos para peso e altura.", "#ff4d4d");
        return;
    }

    // Cálculo do IMC
    const imc = weight / (height * height);
    const classification = getIMCClassification(imc);

    // Exibir o resultado
    const message = `O seu IMC é <strong>${imc.toFixed(2)}</strong> (${classification})`;
    showResult(message, "#28a745");
}

function getIMCClassification(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc < 35) {
        return "Obesidade Grau I";
    } else if (imc >= 35 && imc < 40) {
        return "Obesidade Grau II";
    } else {
        return "Obesidade Grau III";
    }
}

function showResult(message, color) {
    resultDiv.innerHTML = message;
    resultDiv.style.backgroundColor = color === "#ff4d4d" ? "#ffe6e6" : "#e6f9ec";
    resultDiv.style.color = color;
    resultDiv.classList.remove('hidden');
}

// Evento de clique no botão
calculateBtn.addEventListener('click', calculateIMC);

// Suporte para tecla Enter
[weightInput, heightInput].forEach(input => {
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            calculateIMC();
        }
    });
});