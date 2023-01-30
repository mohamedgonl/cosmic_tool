const puppeteer = require('puppeteer');
const fs = require('fs')



crawl= async(loc, start, stop)=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(`https://cancer.sanger.ac.uk/jbrowse/index.html?tracks=cosmic_genes%2Cmuts&dsn=cosmic&loc=${loc}%3A${start}..${stop}&data=data%2Fjson%2Fgrch38%2Fv97%2Fgene&genome=38&highlight=`)
    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('div.media-body.overflow-hidden > a.job-link.clickable-outside');
        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));
        let company_names = document.querySelectorAll('div.media-body.overflow-hidden > a.text-dark.job-company.mb-1.d-inline-block.line-clamp-1');
        company_names = [...company_names];
        let names = company_names.map(link => ({
            company_name: link.getAttribute('title'),
        }));
        let locations = document.querySelectorAll('div.media-body.overflow-hidden > div.d-flex.justify-content-between.mb-1 > div > div > a');
        locations= [...locations];
        let location = locations.map(link => ({
            location : link.innerText
        }))
        let salaries = document.querySelectorAll('div.media-body.overflow-hidden > div.d-lg-flex.justify-content-between > div.d-flex.align-items-center > span.job-salary.text-primary.d-flex.align-items-center');
        salaries= [...salaries];
        let salary = salaries.map(link => ({
            salary : link.innerText
        }));
        let data=[]
        for(var i=0;i< articles.length;i++){
            data.push({
                job_title:articles[i].title,
                company_name: names[i].company_name,
                location: location[i].location,
                salary:salary[i].salary
            })
            
        }
        return data;
    });
    data.push(...articles)
    await browser.close();
    //console.log("finish page with total data:",data.length);
    await delay(4000);
    if(global< 530){
        console.log(`Crawing page ${global}`);
        global++;
        await crawl(global)
    }
    return data;
 }



const start = async () => {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    data.map(e => {
        if(e.QUAL >= 100) console.log(e);
    })
}
start()