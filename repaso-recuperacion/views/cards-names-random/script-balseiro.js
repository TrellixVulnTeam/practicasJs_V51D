import "./styles.scss";
import aa from "./aoe.jpeg";

document.getElementById("image").src = aa;

const clearButton = document.getElementById("clearButton");
const chooseButton = document.getElementById("chooseButton");
const inputTextArea = document.getElementById("inputData");
const inputCount = document.getElementById("inputCount");
const randomValuesText = document.getElementById("randomValues");
const wrongValuesText = document.getElementById("wrongValues");

const checkCivilization = async (civilization) => {
    const rawResult = await fetch("http://localhost:6500/existe/" + civilization);
    const result = await rawResult.json();
    return Boolean(result);
}

clearButton.addEventListener("click", (event) => {
    inputTextArea.value = "";
    inputCount.value = "";
});

chooseButton.addEventListener("click", async (event) => {
    if (inputTextArea.value === "" || inputCount.value === "") {
        alert("Es necesario que rellenes los cambios!!");
        return;
    }

    const textValue = inputTextArea.value;
    const countValue = Number(inputCount.value);

    const splittedValues = textValue.split(",");
    const randomPickedValues = pickRandomValues(splittedValues, Number(countValue));
    const randomValuesJoined = randomPickedValues.join(",");
    const wrongValues = [];

    randomPickedValues.forEach(async (value) => {
        const result = await checkCivilization(value);
        if (!result) wrongValues.push(value);
        wrongValuesText.innerHTML = wrongValues.join(",");
    });

    randomValuesText.innerHTML = randomValuesJoined;
});

const pickRandomValues = (array, count) => {
    const selectedWords = [];
    for (let i = 0; i < count; i++) {
        const selectedWord = array[Math.floor(Math.random() * array.length)];
        if (!selectedWords.includes(selectedWord)) selectedWords.push(selectedWord);
        else i--;
    }
    return selectedWords;
};
