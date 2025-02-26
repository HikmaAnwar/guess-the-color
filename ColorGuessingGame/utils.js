// ColorGuessingGame/utils.js
export const getRandomRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const translations = {
  en: {
    title: "Guess the Color",
    correct: "Correct!",
    playAgain: "Play Again?",
    newColors: "New Colors",
    finish: "Finish Game",
    instructions: "Guess the color corresponding to the displayed RGB value.",
  },
  am: {
    title: "ቀለም ጠቀም",
    correct: "ትክክል ነው!",
    playAgain: "እንደገና ይጫወቱ?",
    newColors: "አዲስ ቀለሞች",
    finish: "ጨዋታውን ጨርስ",
    instructions: "በታች የተከበረውን RGB እንዲሁ ቀለም ይምረጡ።",
  },
  fr: {
    title: "Devine la Couleur",
    correct: "Correct!",
    playAgain: "Rejouer?",
    newColors: "Nouvelles Couleurs",
    finish: "Terminer le Jeu",
    instructions: "Devinez la couleur correspondant à la valeur RGB affichée.",
  },
};
