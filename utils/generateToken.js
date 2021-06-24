const { tokenCharacters, capitalizeAlphabet } = require("./constants");
const getRandomIndex = require("./getRandomIndex");

module.exports = () => {
  const characters = Object.keys(tokenCharacters);
  let tokenLength = 0;
  let token = "";

  do {
    tokenLength += 1;

    const charactersIndex = getRandomIndex(characters);
    const characterType = characters[charactersIndex];
    const charactersArr = tokenCharacters[characterType];

    if (characterType === "numbers") {
      const randomIndex = getRandomIndex(charactersArr);
      const randomNumber = charactersArr[randomIndex];

      token += randomNumber;
    } else {
      const capitalizeAlphabetIndex = getRandomIndex(capitalizeAlphabet);
      const shouldCapitalize = capitalizeAlphabet[capitalizeAlphabetIndex];
      const randomIndex = getRandomIndex(charactersArr);
      const randomAlphabet = charactersArr[randomIndex];

      token += shouldCapitalize ? randomAlphabet.toUpperCase() : randomAlphabet;
    }
  } while (tokenLength < 45);
  return token;
};
