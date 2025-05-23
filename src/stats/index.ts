import Game from '../../../src/playback/Game'
import Match from '../../../src/playback/Match'
import { matches } from './match'
import { RobotType, SpawnAction } from 'battlecode-schema/js/battlecode/schema'



const RobotTypeToName: Record<RobotType, string> = {
    [RobotType.NONE]: 'NONE',
    [RobotType.PAINT_TOWER]: 'Paint tower',
    [RobotType.MONEY_TOWER]: 'Money tower',
    [RobotType.DEFENSE_TOWER]: 'Defense tower',
    [RobotType.SOLDIER]: 'Soldier',
    [RobotType.SPLASHER]: 'Splasher',
    [RobotType.MOPPER]: 'Mopper'
}

export function spawnsPerMatch(match: Match) {
    let spawnsEachType = new Map<RobotType, number>()

    console.log(match.currentRound, 'current round')
    while (match.currentRound.roundNumber < match.maxRound) {
        const currentRound = match.currentRound
        const roundNumber = currentRound.roundNumber
        if (roundNumber % 10 == 0) {
            console.log('on round', currentRound.roundNumber)
        }

        // Jump to the end to populate all actions
        currentRound.jumpToTurn(currentRound.turnsLength)
        for (const action of match.currentRound.actions.actions) {
            const actionData = action.actionData
            if (actionData instanceof SpawnAction) {
                const robotType = actionData.robotType()

                // Hacky counter impl but w/e
                let currentCount = spawnsEachType.get(robotType)
                if (currentCount === undefined) {
                    spawnsEachType.set(robotType, 0)
                    currentCount = 0
                }
                spawnsEachType.set(robotType, currentCount + 1)
            }
        }
        match._stepRound(1)
    }

    // To store in React state for display, need a more serializable / printable version
    // TODO turn this into an array or smth, that can be manipulated easily by callers

    let spawnsDisplay = ''
    for (const [robotType, spawnCount] of spawnsEachType) {
        spawnsDisplay += `${RobotTypeToName[robotType]}: ${spawnCount}, \n`
    }

    return `${spawnsDisplay}`
}

export function getMatchData() {
    const match = matches[0]
    return fetch(`http://localhost:3000/battletrack/data/${match.uuid}.${match.episode}`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            if (buffer.byteLength === 0) {
                alert('Error: Game file is empty.')
                throw Error
            }
            var game = Game.loadFullGameRaw(buffer)
            // Match number hardcoded, feel free to change
            const spawns = spawnsPerMatch(game.matches[4])

            return spawns
        })
        .catch((e) => console.error(e))
    // })
}
