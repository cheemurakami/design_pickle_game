//GLOVAL VARS
let urlsByGameSize = [];
let guessedPositionNum = []; 
let counter = 0;
let locked = false;
const imageUrls = [
  "https://cdn.filestackcontent.com/0xpImnBSQ0i0sZ62RwHU",
  "https://cdn.filestackcontent.com/5nFP5LXmRBKNtZPnSZoM",
  "https://cdn.filestackcontent.com/yEU3afnaR3izTbJ2yCNK",
  "https://cdn.filestackcontent.com/2yPB3iM8RQ2clOOPZZNa",
  "https://cdn.filestackcontent.com/BdTUsuGdQBemFqTidt5j",
  "https://cdn.filestackcontent.com/dztHMgumRL2AUPkuyRbo"
];
const hiddenImageUrl = "https://cdn.filestackcontent.com/mac0VBHdShaBLwOxpq66";


//SELECTING GAMESIZE
$("#inputGroupSelect04").change((e) => {
  let gameSize = e.target.value;
  if (gameSize === "s"){
    urlsByGameSize = imageUrls.slice(0,4);
  } else if (gameSize === "m"){
    urlsByGameSize = imageUrls.slice(0,5);
  } else {
    urlsByGameSize = imageUrls.slice(0,6);
  }
  startGame();
})


//STARTING GAME
const startGame = () => {
  resetGame();

  const shuffledImages = shuffle(urlsByGameSize.concat(urlsByGameSize));
  
  //displaying hidden cards
  shuffledImages.map((_, i) => {
    $(".card-wrapper").append(
      `<div class="card-container"><img class="card-image" data-position=${i} src=${hiddenImageUrl}></div>`
    );
  });
  setupClickHandler(shuffledImages);  
}

//CLICKING IMAGES CHECKING MATCHES 
const setupClickHandler = (shuffledImages) => {
  $(".card-image").click((e) => {
    if (locked) {
      return;
    }
    let imageEl = e.target;
    if (imageEl.src !== hiddenImageUrl) {
      return;
    }
    let imagePosition = $(imageEl).data("position");
    $(imageEl).attr("src", shuffledImages[imagePosition]);
  
    storePositions(imagePosition);
  
    let firstGuessedUrl = shuffledImages[guessedPositionNum[0]];
    let secondGuessedUrl = shuffledImages[guessedPositionNum[1]];
  
    checkMatch(firstGuessedUrl, secondGuessedUrl);
  });
}

//STORING POSITIONS FOR 2 IMAGES
const storePositions = (imagePosition) => {
  guessedPositionNum.push(imagePosition);
  if (guessedPositionNum.length > 2) {
    guessedPositionNum = [imagePosition];
  }
};

//CHECKING MATCHES 
const checkMatch = (firstGuessedUrl, secondGuessedUrl) => {
  if (firstGuessedUrl === secondGuessedUrl) {
    counter++;

    $(".result").html(`<p>${counter} Matched</p><img src=${firstGuessedUrl}>`);

    if(counter === urlsByGameSize.length){
      $('#myModal').modal();
    }


  } else if (guessedPositionNum.length == 2) {
    locked = true;
    setTimeout(() => {
      $(`.card-image[data-position="${guessedPositionNum[0]}"]`).attr(
        "src",
        hiddenImageUrl
      );
      $(`.card-image[data-position="${guessedPositionNum[1]}"]`).attr(
        "src",
        hiddenImageUrl
      );
      locked = false;
    }, 2000);
  }
};

//SHUFFLING IMAGES
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

//RESETTING
const resetGame = () => {
  guessedPositionNum = [];
  counter = 0;
  locked = false;
  $(".card-wrapper").html("");
  $(".result").html("");
}
