import React, { useEffect, useState } from 'react'
import { fetchMatch } from '../../stats'

export const MainPage: React.FC = () => {
    const [dataInState, updateState] = useState(0)

    async function loadMatchBuffers() {
        const data = await fetchMatch()
        // TODO don't rule out 0; handle void properly
        if (data) {
            updateState(data)
        }
        return data
    }

    useEffect(() => {
        loadMatchBuffers()
    })

    return <div>Main Page , neat, dataInState ${dataInState}</div>
}
