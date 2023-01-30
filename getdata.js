const fs = require("fs"); 
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('final_variants.vcf');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    var start = false;
    var data = []
    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if(start) {
        let r = line.trim().split(/\s+/)
        data.push({
            CHROME : r[0],
            POS: r[1],
            ID: r[2],
            REF: r[3],
            ALT: r[4],
            QUAL: r[5],
            FILTER: r[6],
            INFO: r[7],
            FORMAT: r[8],
            results: r[9]
        })
      };
      if(line.includes("#CHROM")) start = true
    }
    return data
  }
  
  processLineByLine().then(rs => {
    fs.writeFile('./data.json',JSON.stringify(rs),(err)=>{
        console.log(err);
    })
  });