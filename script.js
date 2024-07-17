const btn = document.querySelector('.play')
const block = document.querySelectorAll(".block");
const blocks = document.querySelectorAll(".blocks");
const pcBlock = document.querySelectorAll(".pc-block");
const shipsStatusMy = document.querySelector(".ships-status-my span");
const shipsStatusPc = document.querySelector(".ships-status-pc span");
const restartButton = document.querySelector(".restart-button");
const restart = document.querySelector(".restart");

const amountEnableShipsText = document.querySelector(".amount-enable-ships");

let isActiveGame = false;
let amountEnableShips = 20



let isActiveMove = true;






let pcStatus = 0
let personStatus = 0




for (let i = 0; i < block.length; i++) {


    block[i].addEventListener('click', function () {
      if (i >= 100) {
        return;
      }
      if (block[i].classList.contains('active')) {
        return
      }

        if (amountEnableShips >= 1) {
          amountEnableShips--;
          amountEnableShipsText.textContent = amountEnableShips;
          block[i].classList.add("active");
        }
        if (amountEnableShips == 0) {
          
          btn.disabled = false;

        }

    })


}


restartButton.addEventListener('click' ,function() {
  location.reload()
})



function pc() {
  for (let i = 0; i < 20; i++) {
    

    let randomNumber = 0;
    let block = document.querySelectorAll(".block")

    while ( block[100+randomNumber].classList.contains('active') ) {
      randomNumber = Math.floor(Math.random() * 100);
    }
   

    block[100+randomNumber].classList.add('active')

  }
}

pc()




btn.addEventListener('click', function () {
  btn.style.display = 'none'
  isActiveGame = true

  blocks[0].classList.remove('active')
  blocks[1].classList.add('active')
  
})


for (let i = 0; i < pcBlock.length; i++) {

  pcBlock[i].addEventListener('click', function () {
    if (!isActiveGame) return;
    if ( !isActiveMove || pcBlock[i].textContent == '·') return;

    pcBlock[i].textContent = '·'

    let color;

    // this code show you win
    if (pcBlock[i].classList.contains('active')) {
      color = 'red'
      personStatus++
      shipsStatusMy.textContent = personStatus
      if (personStatus == 20) {
        isActiveGame = false
        // setTimeout(() => {
          // alert('You Win')
          restartButton.textContent = 'You Win! Try Again!'
          restart.style.display = 'flex'
        // }, 50);
      }

    } else {
      color = 'white'
      pcSpawn()
    }

    pcBlock[i].style.color = color
    

})

}


function pcSpawn() {
  isActiveMove = false;
  blocks[1].classList.remove('active')
  blocks[0].classList.add('active')


  setTimeout(function () {
    let randomNumber = 0;
  
    while( block[randomNumber].textContent == '·' ) {
      randomNumber = Math.floor(Math.random()*100)
    }
  
    block[randomNumber].textContent = '·'
  
    let color;
  
    if (block[randomNumber].classList.contains('active')) {
      color = 'red'
      pcStatus++
      shipsStatusPc.textContent = pcStatus
      if (pcStatus == 20) {
        isActiveGame = false

        
        restartButton.textContent = 'You Lost! Try Again!'
        restart.style.display = 'flex'
      


      }
      pcSpawn()
    } else {
      color = 'white'
    }
  
    block[randomNumber].style.color = color
    isActiveMove = true;
    blocks[0].classList.remove('active')
    blocks[1].classList.add('active')
  
  }, 2000)



}