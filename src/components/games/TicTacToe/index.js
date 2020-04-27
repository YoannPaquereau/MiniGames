import React, { Component } from 'react'
import style from './tictactoe.module.scss'

class TicTacToe extends Component {
    render() {
        return (
            <div className={style.parent}>
                <div className={style.game}>
                    <h1>Tic-Tac-Toe</h1>
                    <button className={style.createGame}>Créer une partie</button>
                </div>
            </div>
        )
    }
}

export default TicTacToe
