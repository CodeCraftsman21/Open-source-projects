const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs");
//const { title } = require("process");
const json2csv = require("json2csv").Parser;

const webs =["https://www.netmeds.com/non-prescriptions/kapiva-wheat-grass-juice-1-l-1l",
    "https://www.netmeds.com/non-prescriptions/himalaya-ashvagantha-tablets-60-s",
    
];

(async() => {
    let netData =[]
   

    for(let web of webs){
        const response = await request({
            uri: web,
            headers: {
                accept: 
                  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                  "accept-encoding": "gzip, deflate, br",
                  "accept-language": "en-US,en;q=0.9,mr;q=0.8",
            },
            gzip: true,
        });
        let $ = cheerio.load(response);
        let product_name= $('div[class="product-detail"] > h1').text();
        let price= $('div[class="essentials"]>div[class="drug-con pull-left price-box"] > span').text();
        
    
        netData.push({
            product_name, 
            price,
        });
    
    }
    const j2cp = new json2csv();
    const csv = j2cp.parse(netData);

    fs.writeFileSync("./netdata.csv", csv, "utf-8");

    }

    
)();