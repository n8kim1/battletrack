import React, { useEffect, useState } from 'react'
import { fetchMatch } from '../../stats'
import Game from '../../../../src/playback/Game'

export const MainPage: React.FC = () => {
    const [dataInState, updateState] = useState(0)

    async function loadMatchBuffers() {
        const matchArrayBuffer = await fetchMatch()
        // TODO don't rule out 0; handle void properly
        if (matchArrayBuffer) {
            updateState(matchArrayBuffer.byteLength)

            // Some other stuff here, using the renderer. maybe
            const game = Game.loadFullGameRaw(matchArrayBuffer)
            console.log('game', game)
        }
    }

    useEffect(() => {
        loadMatchBuffers()
    })

    return <div>Main Page , neat, dataInState ${dataInState}</div>
}
