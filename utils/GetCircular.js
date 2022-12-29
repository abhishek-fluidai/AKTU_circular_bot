import fs from 'fs';

const getCirculars = async (range) => {
    const data = fs.readFileSync('data.json','utf8');
    const f = JSON.parse(data);
    const circular = [];
    for (let i = 0; i < range; i++) {
     circular.push({"name":f[i][2],
      "date":f[i][3],
      "from":f[i][1],
      "link":f[i][4]})
    }
    return circular;
  }
  

export default getCirculars;