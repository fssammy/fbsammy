export const dailyQuotes = [
  "If I had a flower for every time you made me smile, I'd have a whole garden by now. 🌼",
  "You've made my laugh louder, my smile brighter, and my heart lighter—thank you for being you.",
  "If I had a flower for every time you made me smile, I'd have a whole garden by now. 🌼",
  "You're not just my best friend — you're the calm in my chaos, the hug in my heartbreak, and the giggle in my soul. Life is simply better with you in it. 💖",
];

export const getDailyQuote = (): string => {
  // Always return the first quote (now showing tomorrow's quote)
  return dailyQuotes[0];
};