import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { MainPage } from './pages/main-page'

const elem = document.getElementById('root')
const root = ReactDom.createRoot(elem!)
root.render(
    // <BrowserRouter>
    <MainPage />
    // </BrowserRouter>
    // <div>App.tsx</div>
)
