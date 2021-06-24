const { tokenCharacters, capitalizeString } = require("./constants");
const getRandomIndex = require("./getRandomIndex");

module.exports = () => {
  const characters = Object.keys(tokenCharacters);
  let token = "";
  let tokenLength = 0;

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
      const capitalizeStringIndex = getRandomIndex(capitalizeString);
      const shouldCapitalize = capitalizeString[capitalizeStringIndex];
      const randomIndex = getRandomIndex(charactersArr);
      const randomAlphabet = charactersArr[randomIndex];

      token += shouldCapitalize ? randomAlphabet.toUpperCase() : randomAlphabet;
    }
  } while (tokenLength < 40);
  return token;
};
