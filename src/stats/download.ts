const fs = require('fs')
const { Readable } = require('stream')
const { finished } = require('stream/promises')
import { ReadableStream } from 'stream/web'
import { BattletrackMatch, matches } from './match'

// TODO is a game a set of matches? or vv?

function gameSourceUrlFromMatch(match: BattletrackMatch) {
    const episode = match.episode
    const uuid = match.uuid
    return `https://storage.googleapis.com/mitbattlecode-production-secure/episode/${episode}/replays/${uuid}.${episode}`
}

async function downloadRemoteGame(match: BattletrackMatch) {
    const stream = fs.createWriteStream(`data/${match.uuid}.${match.episode}`)

    const url = gameSourceUrlFromMatch(match)
    const { body } = await fetch(url)
    await finished(Readable.fromWeb(body as ReadableStream<any>).pipe(stream))
}

for (const match of matches) {
    downloadRemoteGame(match)
}
