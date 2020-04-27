import React, { Component } from 'react'
import style from './tictactoe.module.scss'
import io from 'socket.io-client'
import { startGame, onClick, drawCase } from './Functions'

const ENDPOINT = "http://localhost:8080";

class TicTacToe extends Component {

    constructor() {
        super();
        this.socket = null;
        this.state = {
            room: '',
            playerType: '',
            opponent: '',
            turn: ''
        }
        this.getTick = this.getTick.bind(this);
    }

    componentDidMount() {
        this.socket = io(ENDPOINT, {transports: ['websocket']});

        this.socket.on('newGame', function(data) {
            document.getElementById('buttonAction').style.display = 'none';
            this.setState({ 
                room: data.room,
                playerType: 'host'
            })
        }.bind(this));

        this.socket.on('startGame', function(data) {
            this.setState({ 
                room: data.room,
                opponent: (data.players.player1.id === this.props.user.id) ? data.players.player2.username : data.players.player1.username
            });

            startGame();
            document.getElementById('buttonAction').style.display = 'none';
            document.getElementById('joinForm').style.display = 'none';
            document.getElementById('preLobby').style.display = 'none';
            document.getElementById('game').style.display = 'block';

            this.setState({ turn: data.turn.username})

            if (this.props.user.id === data.turn.id) {
                this.yourTurn();
            }
        }.bind(this));

        this.socket.on('drawCase', function (data) {
            drawCase(
                {   checkbox: data.checkbox,
                    player: { username: this.props.user.username, id: this.props.user.id },
                    player2: data.player2
                }
            );
        }.bind(this));

        this.socket.on('changeTurn', function(data) {
            if (data.player.id !== this.props.user.id) {
                this.yourTurn();
            }
            else {
                this.setState({ turn: this.state.opponent })
            }
        }.bind(this));

        this.socket.on('draw', function(data) {
            document.getElementById('turn').style.display = 'none';
            document.getElementById('winner').innerHTML = 'Match nul !';
        })

        this.socket.on('endgame', function(data) {
            document.getElementById('turn').style.display = 'none';
            let winner;

            if (data.player.id === this.props.user.id)
                winner = "Vous avez gagné !";
            else
                winner = data.player.username + " a gagné !";
            document.getElementById('winner').innerHTML = winner;
        }.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    createGame = () => {
        this.socket.emit('createGame', { player: { username: this.props.user.username, id: this.props.user.id }})
    }

    formJoin = () => {
        document.getElementById('joinForm').style.display = 'block';
    }

    joinGame = () => {
        this.socket.emit('joinGame', { room: this.state.room ,player: { username: this.props.user.username, id: this.props.user.id } })
    }
        
    onChange = event =>  {
        this.setState({ room: event.target.value });
    }

    yourTurn = () => {
        this.setState({ turn: 'Vous' })
        document.getElementsByTagName('canvas')[0].addEventListener('click', this.getTick);
    }

    getTick (event) {
        let data = onClick(event);
                    
        if (data) {
            this.socket.emit('sendTick', {
                room: this.state.room,
                line: data.line,
                column: data.column,
                player: { username: this.props.user.username, id: this.props.user.id }
            });

            document.getElementsByTagName('canvas')[0].removeEventListener('click', this.getTick);
        }
    }


    render() {
        return (
            <div className={style.parent}>
                <div className={style.game}>
                    <h1>Tic-Tac-Toe</h1>

                    <div className={style.buttonAction} id='buttonAction'>
                        <button className={style.createGame} onClick={this.createGame}>Créer une partie</button>
                        <button className={style.joinGame} onClick={this.formJoin}>Rejoindre une partie</button>
                    </div>

                    <div className={style.joinForm} id='joinForm'>
                        <input type='text' placeholder='Nom de la partie' onChange={this.onChange} value={this.state.room} />
                        <span className={style.findGameButton} onClick={this.joinGame} role='img' aria-label="sheep">🔍</span>
                        <span className={style.err}></span>
                    </div>

                    <div className={style.preLobby} id='preLobby'>
                        { this.state.playerType === 'host' &&
                            <p>Votre partie : {this.state.room}</p>
                        }
                    </div>

                    <div className={style.gameDraw} id='game'>
                        <div className={style.gameInfo} id='gameInfo'>Votre opposant : { this.state.opponent }</div>
                        <div className={style.turn} id='turn'>Tour: <span id='turnPlayer'>{this.state.turn}</span></div>
                        <div className={style.winner} id='winner'></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TicTacToe
