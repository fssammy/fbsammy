export const dailyQuotes = [
  "Every moment brings you closer to something extraordinary - trust the journey.",
  "You're not just my sunshine—you're the whole sky after the storm.",
  "When you're around, the world feels gentler—like even the chaos knows to calm down.",
  "You light up every room you walk into – never forget your glow was made to shine, not shrink.",
  "No mountain is too high when you've got fire in your heart and a sister in your corner.",
  "Life may throw storms, but with you by my side, every rainbow feels closer.",
  "Your dreams are calling, and today is the perfect day to answer.",
  "Even on your hardest days, I hope you remember how deeply loved and wildly capable you are.",
  "Chin up, crown on – queens like you don't quit, they rise.",
  "You were never meant to blend in – your sparkle is supposed to stand out.",
  "You're not just growing, you're blooming – and girl, it's beautiful.",
  "The world is better because you're in it – don't ever doubt that for a second.",
  "We're a team – when you fly, I cheer; when you fall, I catch. Always.",
  "Mistakes don't define you, they shape the masterpiece you're becoming.",
  "You've got dreams that matter and a heart that can change the world – keep going.",
  "If your wings ever forget how to fly, I'll remind them what they're made for.",
  "You're like sunshine mixed with resilience – the rare kind of magic that never fades.",
  "You're doing better than you think. Be gentle with your soul, it's learning.",
  "Through every twist and turn, never forget – you're never alone. You've got me, always.",
  "Magic happens when you believe in yourself as much as I believe in you.",
  "You're not just reaching for the stars – you're becoming one."
];

export const getDailyQuote = (): string => {
  // Get the current date and calculate days since a reference point
  const now = new Date();
  const referenceDate = new Date('2025-01-01'); // Reference date for consistent rotation
  const daysDifference = Math.floor((now.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Use modulo to cycle through quotes, starting with index 0 (rainbow quote first)
  const quoteIndex = daysDifference % dailyQuotes.length;
  
  return dailyQuotes[quoteIndex];
};