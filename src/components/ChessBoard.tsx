import React from 'react';
import Tile from './Tile.tsx';
import '../style/chessBoard.css';

const horizontalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const verticalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece{
  image:string
  x:number
  y:number
}

const pieces:Piece[]=[];

for (let i = 0; i < 8; i++) {
  pieces.push({image:'assets/pawn_b.png',x:i,y:6})
}
for (let i = 0; i < 8; i++) {
  pieces.push({image:'assets/pawn_w.png',x:i,y:1})
}
pieces.push({image:'assets/rook_b.png',x:0,y:7})
pieces.push({image:'assets/rook_b.png',x:7,y:7})
pieces.push({image:'assets/rook_w.png',x:0,y:0})
pieces.push({image:'assets/rook_w.png',x:7,y:0})

pieces.push({image:'assets/knight_b.png',x:1,y:7})
pieces.push({image:'assets/knight_b.png',x:6,y:7})
pieces.push({image:'assets/knight_w.png',x:1,y:0})
pieces.push({image:'assets/knight_w.png',x:6,y:0})

pieces.push({image:'assets/bishop_b.png',x:2,y:7})
pieces.push({image:'assets/bishop_b.png',x:5,y:7})
pieces.push({image:'assets/bishop_w.png',x:2,y:0})
pieces.push({image:'assets/bishop_w.png',x:5,y:0})

pieces.push({image:'assets/queen_b.png',x:3,y:7})
pieces.push({image:'assets/queen_w.png',x:3,y:0})

pieces.push({image:'assets/king_b.png',x:4,y:7})
pieces.push({image:'assets/king_w.png',x:4,y:0})

export default function ChessBoard() {

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let number = j + i + 2;
      let image=undefined;
      pieces.forEach(p=>{
        if(p.x===i && p.y===j){
          image=p.image
        }
      })
      board.push(<Tile image={image} number={number}/>)
    }
  }
  return <div id='chessboard'>{board}</div>
}
