const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images/real');
const files = fs.readdirSync(dir);
const photos = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png')).map(f => '/images/real/' + f);

const walk = (dir) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = false;
      let pIndex = 0;
      
      content = content.replace(/"https:\/\/images.unsplash.com\/[^"]+"/g, (match) => {
        modified = true;
        const r = '"' + photos[pIndex % photos.length] + '"';
        pIndex++;
        return r;
      });
      content = content.replace(/'https:\/\/images.unsplash.com\/[^']+'/g, (match) => {
        modified = true;
        const r = "'" + photos[pIndex % photos.length] + "'";
        pIndex++;
        return r;
      });

      if (modified) {
        fs.writeFileSync(p, content);
        console.log('Updated', p);
      }
    }
  });
};

walk('src/pages');
walk('src/components');
