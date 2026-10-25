const fs = require('fs');

let content = fs.readFileSync('src/data/experiences.js', 'utf8');

const replacements = [
  {
    from: /\["04:30 AM \(Sunrise\)", "08:30 AM \(Morning\)", "03:30 PM \(Sunset\)"\]/g,
    to: '["04:30 AM (Sunrise)", "09:00 AM (Morning)", "04:00 PM (Afternoon)", "05:30 PM (Sunset)"]'
  },
  {
    from: /\["04:30 \(Рассвет\)", "08:30 \(Утро\)", "15:30 \(Закат\)"\]/g,
    to: '["04:30 (Рассвет)", "09:00 (Утро)", "16:00 (День)", "17:30 (Закат)"]'
  },
  {
    from: /\["04:30 صباحاً \(الشروق\)", "08:30 صباحاً \(الصباح\)", "03:30 مساءً \(الغروب\)"\]/g,
    to: '["04:30 صباحاً (الفجر)", "09:00 صباحاً", "04:00 عصراً", "05:30 مساءً (المغرب)"]'
  },
  {
    from: /\["04:30 \(Alba\)", "08:30 \(Mattina\)", "15:30 \(Tramonto\)"\]/g,
    to: '["04:30 (Alba)", "09:00 (Mattina)", "16:00 (Pomeriggio)", "17:30 (Tramonto)"]'
  },
  {
    from: /\["04:30 \(Sonnenaufgang\)", "08:30 \(Morgen\)", "15:30 \(Sonnenuntergang\)"\]/g,
    to: '["04:30 (Sonnenaufgang)", "09:00 (Morgen)", "16:00 (Nachmittag)", "17:30 (Sonnenuntergang)"]'
  },
  {
    from: /\["04:30 \(Amanecer\)", "08:30 \(Mañana\)", "15:30 \(Atardecer\)"\]/g,
    to: '["04:30 (Amanecer)", "09:00 (Mañana)", "16:00 (Tarde)", "17:30 (Atardecer)"]'
  }
];

let updatedContent = content;

replacements.forEach(({ from, to }) => {
  updatedContent = updatedContent.replace(from, to);
});

fs.writeFileSync('src/data/experiences.js', updatedContent);
console.log('Update complete.');
