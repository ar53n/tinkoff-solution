const { classType, getNumberToken } = require("./classifier_type");
const { classCat } = require("./classifier_cat");

// console.log(classCat.getClassifications(text));
// console.log(classType.classify(text));

const fastify = require("fastify")();

fastify.register(require("@fastify/cors"));

fastify.post("/api/cost", async (request, reply) => {
  let result = [];
  const rasxod = new Map();
  const doxod = new Map();
  try {
    const rasxodRegexp = RegExp(`Расход(ы?)(:?)`, "gi");
    const doxodRegexp = RegExp(`(Прибыль|Доход)(:?)`, "gi");
    let str = "";
    const text = JSON.parse(request.body).text;
    console.log(text);
    const words = text.split(`\n`);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word === "\n") {
        str = "";
      }
      if (word.match(rasxodRegexp)) {
        str = "rasxod";
        continue;
      }
      if (word.match(doxodRegexp)) {
        str = "doxod";
        continue;
      }
      if (str) {
        const amount = getNumberToken(word);
        const classes = classCat.classify(word);
        if (str === "rasxod") {
          rasxod.set(word, {
            tags: [classes],
            amount: parseFloat(amount),
          });
        }
        if (str === "doxod") {
          doxod.set(word, {
            tags: [classes],
            amount: parseFloat(amount),
          });
        }
      }
    }
    console.log(rasxod, doxod);
  } catch (e) {
    console.log(e);
  }
  doxod.forEach((value, key) => {
    result.push({ type: "doxod", ...value });
  });
  rasxod.forEach((value, key) => {
    result.push({ type: "rasxod", ...value });
  });
  return result;
});

// запускаем сервер
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
