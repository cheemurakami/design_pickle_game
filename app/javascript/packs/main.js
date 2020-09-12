console.log('hello')

$(".card-image").click((e) => {
  let imageEl = e.target
  $(imageEl).attr("src", imageUrl[0])
})

const imageUrl = [
  "https://cdn.filestackcontent.com/0xpImnBSQ0i0sZ62RwHU", 
  "https://cdn.filestackcontent.com/5nFP5LXmRBKNtZPnSZoM", 
  "https://cdn.filestackcontent.com/yEU3afnaR3izTbJ2yCNK", 
  "https://cdn.filestackcontent.com/2yPB3iM8RQ2clOOPZZNa"
]

