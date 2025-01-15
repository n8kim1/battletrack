// If I load this code from a broser context, can I use Game and Match?
// import Game from '../../../src/playback/Game'
// import Match from '../../../src/playback/Match'
import { matches } from './match'

export function fetchMatch() {
    // return matches.map((match) => {
    // TODO check the pathing
    const match = matches[0]
    return fetch(`http://localhost:3000/battletrack/data/${match.uuid}.${match.episode}`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            if (buffer.byteLength === 0) {
                alert('Error: Game file is empty.')
                throw Error
            }
            console.log('buffer loaded, byteLength', buffer.byteLength)
            return buffer
            // var game = Game.loadFullGameRaw(buffer)
            // console.log('Analyzing match from', gameSource)
            // return game.matches
        })
        .catch((e) => console.error(e))
    // })
}

// fetchRemoteGame(gameSource)

// // TODO a method to save matches
// // Then store into a helper fn
// // All async stuff can run there, i guess
// export async function main() {
//     return 1
// }
// //     matches = matches.concat(await fetchRemoteGame(gameSource))

// //     // let levelsAggregate = [0, 0, 0]

// //     // for (const match of matches) {
// //     //     const game = match.game
// //     //     const teams = game.teams

// //     //     let currentRoundNumber = -1
// //     //     let maxRound = match.maxRound

// //     //     while (currentRoundNumber < maxRound) {
// //     //         match._stepRound(1)
// //     //         currentRoundNumber = match.currentRound.roundNumber

// //     //         // Analyze actions per round. (Can analyze bodies, etc, in a similar way)
// //     //         const actions = match.currentRound.actions.actions
// //     //         for (const action of actions) {
// //     //             if (action instanceof SpawnAction) {
// //     //                 console.log('SpawnAction found')
// //     //             }
// //     //         }
// //     //     }

// //     //     // Analyze team stats per match
// //     //     const stats = match.currentRound.stat

// //     //     // for (const team of teams) {
// //     //     //     const teamStat = stats.getTeamStat(team)
// //     //     //     const levels = teamStat.specializationTotalLevels

// //     //     //     // Do some example math.
// //     //     //     // (Aggregate _relative_ usage of each specialization,
// //     //     //     // for consistent aggregation)
// //     //     //     const levelsSlice = levels.slice(1, 4)
// //     //     //     const levelsTotal = levelsSlice.reduce((a, b) => a + b)
// //     //     //     const levelsNormed = levelsSlice.map((l) => l / levelsTotal)

// //     //     //     for (const i in levelsAggregate) {
// //     //     //         levelsAggregate[i] += levelsNormed[i]
// //     //     //     }
// //     //     // }
// //     // }

// //     // const levelsNormed = levelsAggregate.map((l) => Math.round((l / (matches.length * 2)) * 100))
// //     // console.log(
// //     //     `Specialization levels: ${levelsNormed[0]}% attack, ${levelsNormed[1]}% build, ${levelsNormed[2]}% heal`
// //     // )

// //     // return levelsNormed
// //     return 1
// // }

// // main()
// //     .catch((reason) => {
// //         console.log('Error:', reason)
// //     })
// //     .then((value) => {
// //         if (value) {
// //             fs.writeFile('mynewfile3.txt', value.toString(), (err) => {
// //                 if (err) throw err
// //                 console.log('The file has been saved!')
// //             })
// //         }
// //     })
