const imageUrls = [
  "https://cdn.filestackcontent.com/0xpImnBSQ0i0sZ62RwHU",
  "https://cdn.filestackcontent.com/5nFP5LXmRBKNtZPnSZoM",
  "https://cdn.filestackcontent.com/yEU3afnaR3izTbJ2yCNK",
  "https://cdn.filestackcontent.com/2yPB3iM8RQ2clOOPZZNa",
];
const hiddenImageUrl = "https://cdn.filestackcontent.com/mac0VBHdShaBLwOxpq66";

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const shuffledImages = shuffle(imageUrls.concat(imageUrls));

//displaying hidden cards
shuffledImages.map((_, i) => {
  $(".card-wrapper").append(
    `<div class="card-container"><img class="card-image" data-position=${i} src=${hiddenImageUrl}></div>`
  );
  if ((i + 1) % 4 == 0) {
    $(".card-wrapper").append('<div class="break"></div>');
  }
});

let guessedPositionNum = [];
let counter = 0;
let locked = false;

$(".card-image").click((e) => {
  if (locked) {
    return;
  }
  let imageEl = e.target;
  if (imageEl.src !== hiddenImageUrl) {
    return console.log("already flipped");
  }
  let imagePosition = $(imageEl).data("position");
  $(imageEl).attr("src", shuffledImages[imagePosition]);

  storePositions(imagePosition);

  let firstGuessedUrl = shuffledImages[guessedPositionNum[0]];
  let secondGuessedUrl = shuffledImages[guessedPositionNum[1]];

  checkMatch(firstGuessedUrl, secondGuessedUrl);
});

const storePositions = (imagePosition) => {
  guessedPositionNum.push(imagePosition);
  if (guessedPositionNum.length > 2) {
    guessedPositionNum = [imagePosition];
  }
  console.log(guessedPositionNum);
};

const checkMatch = (firstGuessedUrl, secondGuessedUrl) => {
  if (firstGuessedUrl === secondGuessedUrl) {
    counter++;
    console.log(counter, "Matched");

    $(".result").html(`<p>${counter} Matched</p><img src=${firstGuessedUrl}>`);
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
