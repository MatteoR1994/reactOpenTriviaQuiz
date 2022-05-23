import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { GameBoard } from "../components/layouts/GameBoard"
import { Home } from "../components/layouts/Home"

export const Switch = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<GameBoard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}