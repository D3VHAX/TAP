import Router from 'koa-router'
import {Logger} from 'utils/logger'
const router = new Router()
const logger = new Logger('api@Articles')
import Elastic from 'models'

router.get('/articles', async ctx => {
  let articles = [
    {
      "keywords": [
        "facebook",
        "microsoft",
        "acteurs",
        "veulent",
        "lutter",
        "cyberguerre"
      ],
      "publisher": "01Net",
      "categories": [
        "securite"
      ],
      "title": "Facebook, Microsoft et 32 autres acteurs veulent lutter contre la cyberguerre",
      "description": "Les signataires s’engagent à ne jamais collaborer avec des gouvernements dans le cadre d’actions cybernétiques offensives. Ils veulent également renforcer leurs systèmes de défense pour éviter que leurs technologies ne soient détournées d’une manière ou d’une autre.   ",
      "creationDate": "Wed, 18 Apr 2018 12:34:29 +0200",
      "picture": "https://img.bfmtv.com/i/0/0/ff2/f269e1c2730aed21e5668ad2d47c5.jpg",
      "url": "https://www.01net.com/actualites/facebook-microsoft-et-32-autres-acteurs-veulent-lutter-contre-la-cyberguerre-1422051.html",
      "stats": {
        "readingTime": 133200,
        "wordCount": 444
      }
    },
    {
      "keywords": [
        "attaques",
        "réseaux",
        "france",
        "également",
        "ciblée",
        "manière",
        "«très",
        "inquiétante»"
      ],
      "publisher": "01Net",
      "categories": [
        "securite"
      ],
      "title": "Attaques réseaux : la France également ciblée de manière «très inquiétante»",
      "description": "Selon l’ANSSI, des infrastructures françaises sensibles sont pénétrées par « des attaquants de haut niveau » dont le but est probablement de préparer des conflits futurs.     ",
      "creationDate": "Tue, 17 Apr 2018 04:34:25 +0200",
      "picture": "https://img.bfmtv.com/i/0/0/9eb/710c6698e9fe9667611a0d4528230.jpg",
      "url": "https://www.01net.com/actualites/attaques-reseaux-la-france-egalement-ciblee-de-maniere-tres-inquietante-1421367.html",
      "stats": {
        "readingTime": 132600,
        "wordCount": 442
      }
    },
    {
      "keywords": [
        "façons",
        "reporter",
        "vieilles",
        "baskets"
      ],
      "publisher": "Elle",
      "categories": [
        "mode"
      ],
      "title": "3 façons de (re)porter ses vieilles baskets ",
      "description": "Façon n°1 : pour un lundi marathonesque Oui, les baskets (vieilles de surcroît) défient les lois du temps mieux que personne. Pas question donc de claquer la porte de son appart le lundi matin sans une paire de sneakers aux pieds. Jusque-là réservé a... A lire sur elle.fr",
      "creationDate": "Wed, 09 May 2018 16:30:00 +0200",
      "picture": "http://resize-elle.ladmedia.fr/r/400,279,ffffff,forcex,center-middle/img/var/plain_site/storage/images/mode/chaussures/3-facons-de-re-porter-ses-vieilles-baskets-3670424/86764184-1-fre-FR/3-facons-de-re-porter-ses-vieilles-baskets.jpg",
      "url": "http://www.elle.fr/Mode/Chaussures/3-facons-de-re-porter-ses-vieilles-baskets-3670424",
      "stats": {
        "readingTime": 115800,
        "wordCount": 386
      }
    }
  ]

  try {
    ctx.body = (articles)
  } catch (error) {
    ctx.status = 400
    ctx.body = {err: 'Error occured while fetching data'}
  }
})
/*
Params
action : "like" or "dislike"
articleID : int
readingTime int
 */
router.post('/opinion', async ctx => {
  try {
    let body = ctx.request.body
    if(body.readingTime && body.action === "like"){
      logger.info(body.readingTime)
    }
    logger.debug(body.action)
    logger.debug(body.articleID)
    ctx.status = 200
  } catch (error) {
    ctx.status = 400
    ctx.body = {err: 'Error occured while fetching data'}
  }
})

export default router
