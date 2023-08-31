const cherio = require('cherio');
const request = require('request');
const fs = require('fs');



var WriteStream = fs.createWriteStream("ImagesLink.txt", "utf-8");


request('https://www.netmeds.com',(err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("Request was success");
        const $=cherio.load(html);
        $("img").each((index,image)=>{
            var img=$(image).attr('src');
            //var baseUrl='https://www.netmeds.com';
            var Links=img;
            
            WriteStream.write(Links);
            WriteStream.write("\n");
        })

    }else{
        console.log("Request is failed");
    }
})