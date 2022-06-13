// const neatCsv = require('neat-csv');
const fs = require('fs');


fs.readFile('/Users/developer/Response.MerchantBulkLoadV3_Bindo_20220413.csv.csv',async (err, data) => {
    if(err){
        console.error(err);
        return
    }
    const stat = fs.lstatSync('/Users/developer/Response.MerchantBulkLoadV3_Bindo_20220413.csv.csv');
    if(stat.size<=4,(err)) {
        if (err) {
            console.log(err);
        }
        fs.writeFile('/Users/developer/Response.MerchantBulkLoadV3_Bindo_20220413.csv.csv', '没有获取到信息')

    }
    })

