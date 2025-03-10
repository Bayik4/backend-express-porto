export const generateSlug = (text) => {
    const arrayText = text.toLowerCase().split(" ");
    const randomInt = Math.round((Math.random() * 100000));

    arrayText.push(randomInt);

    return arrayText.join("-");
}