const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const youtubedl = require('youtube-dl');
const express = require('express');

const youtube = 'https://www.youtube.com/watch?v=';

const app = express();
app.use(cors({ origin: true }));

async function getUrl(id){
    const puppeteer = require('puppeteer');
    let path = 'https://www.ssyoutube.com/watch?v=' + id
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    try{
        const page = await browser.newPage();
        await page.goto(path);
        await page.waitForSelector('.def-btn-box');
        const href = await page.$eval('div.def-btn-box a', e => e.href);
        await browser.close();
        return href;
    } catch(err){
        console.error(err)
        await browser.close();
        return null;
    }
}

app.get('/direct/:url', (req, res) => {
    let video = youtubedl(youtube + req.params.url);
 
    video.on('info', (info) => {
        let name = info._filename.replace(/(.+)(.{12})(\.)(.{3,4}$)/gm, '$1$3$4');
        res.set('Content-disposition', "attachment;filename=" + encodeURI(name));
    });

    video.pipe(res);
});

app.get('/ss/:url', async (req, res) => {
    console.log('NEW REQUEST');
    console.log(req.params.url)
    let downloadUrl = await getUrl(req.params.url); 
    if(downloadUrl) res.redirect(downloadUrl);
    else res.end("ERROR");
    
});

exports.loadvideo = functions.https.onRequest(app);
