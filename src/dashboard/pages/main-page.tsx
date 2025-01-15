import React, { useEffect, useState } from 'react'
import { fetchMatch } from '../../stats'
import Game from '../../../../src/playback/Game'

export const MainPage: React.FC = () => {
    const [dataInState, updateState] = useState(0)

    async function loadMatchBuffers() {
        const matchArrayBuffer = await fetchMatch()
        // TODO don't rule out 0; handle void properly
        if (matchArrayBuffer) {
            // Some other stuff here, using the renderer. maybe
            const game = Game.loadFullGameRaw(matchArrayBuffer)
            console.log('game', game)
            updateState(game.matches[0].maxRound)
        }
    }

    useEffect(() => {
        loadMatchBuffers()
    })

    return <div>Game 1 has {dataInState} rounds</div>
}
