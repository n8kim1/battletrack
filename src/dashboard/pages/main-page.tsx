import React, { useEffect, useState } from 'react'
import { getMatchData } from '../../stats'

export const MainPage: React.FC = () => {
    let spawnsEachTypeInit = ''

    const [spawnsEachTypeState, updateState] = useState(spawnsEachTypeInit)

    async function loadMatchBuffers() {
        const spawnsEachType = await getMatchData()
        if (spawnsEachType) {
            updateState(spawnsEachType)
        }
    }

    useEffect(() => {
        loadMatchBuffers()
    })

    return <div>The match has spawn quantities of: {spawnsEachTypeState}</div>
}
