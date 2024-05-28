import { Action } from 'battlecode-schema/js/battlecode/schema/action'
import { ACTION_DEFINITIONS } from '../../src/playback/Actions'
import Game from '../../src/playback/Game'

// TODO method from id to url of game source, using the helper method
// or this can be integrated w tournament methods later right
const replayId = '930826dd-74ba-45a2-806f-d6578b549a6a'
const gameSource = `https://storage.googleapis.com/mitbattlecode-production-secure/episode/bc24/replays/${replayId}.bc24`

async function main() {
    let levelsAggregate = [0, 0, 0]

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

        // Analyze team stats per match
        const stats = match.currentTurn.stat
        const teams = game.teams

        for (const team of teams) {
            const teamStat = stats.getTeamStat(team)
            const levels = teamStat.specializationTotalLevels

            // Do some example math.
            // (Aggregate _relative_ usage of each specialization,
            // for consistent aggregation)
            const levelsSlice = levels.slice(1, 4)
            const levelsTotal = levelsSlice.reduce((a, b) => a + b)
            const levelsNormed = levelsSlice.map((l) => l / levelsTotal)

            for (const i in levelsAggregate) {
                levelsAggregate[i] += levelsNormed[i]
            }
        }
    }

    const levelsNormed = levelsAggregate.map((l) => Math.round((l / (game.matches.length * 2)) * 100))
    console.log(
        `Specialization levels: ${levelsNormed[0]}% attack, ${levelsNormed[1]}% build, ${levelsNormed[2]}% heal`
    )
}

main().catch((reason) => {
    console.log('Error:', reason)
})
