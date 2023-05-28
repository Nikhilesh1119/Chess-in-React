import React from 'react'
import { PieceType, TeamType, Piece } from '../components/ChessBoard.tsx';

export default class Refree {
    isTileOccupied(x: number, y: number, boardState: Piece[]): boolean {
        const piece = boardState.find((p) => p.x === x && p.y === y)
        if (piece) {
            return true
        } else {
            return false
        }
    }

    isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType, boardState: Piece[]) {
        console.log('refree is checking...');
        console.log(`previous step ${px} ${py}`);
        console.log(`current step ${x} ${y}`);
        console.log(`type ${type}`);
        console.log(`team ${team}`);

        if (type === PieceType.PAWN) {
            const specialRow = team === TeamType.OUR ? 1 : 6
            const pawnDirection = team === TeamType.OUR ? 1 : -1

            if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
                if (!this.isTileOccupied(x, y, boardState) && !this.isTileOccupied(x, y - pawnDirection, boardState)) {
                    return true
                }
            } else if (px === x && y - py === pawnDirection) {
                if (!this.isTileOccupied(x, y, boardState)) {
                    return true
                }
            }
        }
        return false
    }
}
