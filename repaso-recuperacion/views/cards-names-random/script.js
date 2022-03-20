
const chooseButton = document.getElementById('button-choose');
const clearButton = document.getElementById('button-clear');
let textArea = document.getElementById('cards-text-area');
let numberCards = document.getElementById('random-cards-num');
let list = document.getElementById('list-results');
let wrongList = document.getElementById('wrong-list-results');


const checkCard = async (card) => {
    const rawResult = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + card);
    const result = await rawResult.json();
    return Boolean(result);
}

clearButton.addEventListener('click',async (e)=>{
    list.innerText='';
    textArea.value = '';
});

chooseButton.addEventListener('click', async (e) => {
    textArea.value === '' || numberCards.value === '' || numberCards.value < 0 ? alert('error') : console.log('data introduced correct');
    let text = textArea.value;
    let arrayCards = text.split(',');
    let randomCards = randomNames(arrayCards);
    let randomCardsJoined = randomCards.join(',');
    let wrongValues = [];
    let wrightValues = [];

    for (const e1 of randomCards) {
        const result = await checkCard(e1);
        !result ? wrongValues.push(e1) :wrightValues.push(e1);
        console.log(wrightValues);
        console.log(wrongValues);
    }
    wrongList.innerText = wrongValues.join(',');

    list.innerText = wrightValues.join(',');

})


/*Baby Dragon, samu*/

function randomNames(arrayCards){
    let resultArray = [];
    if (arrayCards.length>=numberCards.value){
        for (let i=0;i<numberCards.value;i++){
            let selectedCard = arrayCards[Math.floor( Math.random() * arrayCards.length)];
            !resultArray.includes(selectedCard)?resultArray.push(selectedCard):i--;
        }
        return resultArray;
    }else{
        alert('number of cards wanted can´t be superior to the number of cards inserted');
        return resultArray;
    }

}





