"use strict";

const natural = require("natural");
const porterStemmer = natural.PorterStemmerRu;
const classifier = new natural.BayesClassifier(porterStemmer);

classifier.addDocument("Покупка продуктов в магазине", "расходы");
classifier.addDocument("купил машину", "расходы");
classifier.addDocument("Заработная плата за март", "доходы");
classifier.addDocument("Покупка билетов на поезд", "расходы");
classifier.addDocument("Дивиденды от инвестиций", "доходы");
classifier.addDocument("Получил зарплату", "доходы");
classifier.addDocument("Получил дивиденды", "доходы");
classifier.addDocument("Пришла зарплата", "доходы");
classifier.addDocument("Потратил на игрушки", "расходы");

classifier.train();

const getNumberToken = (word) => {
  const tokenizer = new natural.WordTokenizer();

  // Токенизация текста расходов
  const t = tokenizer.tokenize(word);
  console.log(t);
  // Фильтрация токенов, чтобы получить только числовые значения
  const [token] = t.filter(
    (token) =>
      natural.JaroWinklerDistance(token, parseFloat(token).toString(), {}) > 0.8
  );
  return token.replace(/к|k/, "000");
};

module.exports = {
  classType: classifier,
  getNumberToken,
};
