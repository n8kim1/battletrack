import { Action } from 'battlecode-schema/js/battlecode/schema/action'
import { ACTION_DEFINITIONS } from '../../src/playback/Actions'
import Game from '../../src/playback/Game'

// TODO method from id to url of game source, using the helper method
// or this can be integrated w tournament methods later right
const replayId = '930826dd-74ba-45a2-806f-d6578b549a6a'
const gameSource = `https://storage.googleapis.com/mitbattlecode-production-secure/episode/bc24/replays/${replayId}.bc24`

async function main() {
    const fetchRemoteGame = await fetch(gameSource)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            if (buffer.byteLength === 0) {
                alert('Error: Game file is empty.')
                throw Error
            }
            return buffer
        })

    const buffer = fetchRemoteGame
    var game = Game.loadFullGameRaw(buffer)
    console.log('Analyzing match from', gameSource)

    for (const match of game.matches) {
        let currentTurnNumber = -1
        let maxTurn = match.maxTurn

        while (currentTurnNumber < maxTurn) {
            match.stepTurn(1, false, true)
            currentTurnNumber = match.currentTurn.turnNumber

            // Analyze actions per round. (Can analyze bodies, etc, in a similar way)
            const actions = match.currentTurn.actions.actions
            for (const action of actions) {
                if (action instanceof ACTION_DEFINITIONS[Action.CAPTURE_FLAG]) {
                    console.log('flag captured!', 'turn ', currentTurnNumber)
                }
            }
        }
}

main().catch((reason) => {
    console.log('Error:', reason)
})
