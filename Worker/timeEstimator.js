const cheerio = require('cheerio')
import axios from 'axios'
import * as publishers from './publishers'
var htmlToText = require('html-to-text')
var readTime = require('reading-time')

const instance = axios.create({
  headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'}
});

let readingTime = (url, publisher) => {
  return new Promise((resolve, reject) => {
    instance.get(url).then(function(res) {
      const $ = cheerio.load(res.data, {    normalizeWhitespace: true})
      let div = $(publisher.articleParsingTag).html()
      if (div == null){
        reject("Div is null")
      }
      let text = htmlToText.fromString(div, {
        wordwrap: 130,
        ignoreHref: true,
        ignoreImage: true,
      })
      resolve(readTime(text))
    }).catch((err)=>{
      reject(err)
    })
  })
}

export default readingTime