import React, { useRef, useState } from 'react';
import Refree from '../refree/refree.tsx';
import Tile from './Tile.tsx';
import '../style/chessBoard.css';

const horizontalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const verticalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const initialBoardState:Piece[]=[]

export enum TeamType{
  OPPONENT,
  OUR
}

export enum PieceType{
  PAWN,
  ROOK,
  KNIGHT,
  BISHOP,
  QUEEN,
  KING
}

export interface Piece {
  image: string
  x: number
  y: number
  type:PieceType
  team:TeamType
}
for (let p = 0; p < 2; p++) {
  const teamType = (p===0)?TeamType.OPPONENT:TeamType.OUR
  const type=(teamType===TeamType.OPPONENT)?"b":"w"
  const y=(teamType===TeamType.OPPONENT)?7:0

  for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: `assets/pawn_b.png`, x: i, y: 6  ,type:PieceType.PAWN,team:TeamType.OPPONENT})
  }
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: `assets/pawn_w.png`, x: i, y: 1 ,type:PieceType.PAWN,team:TeamType.OUR})
  }
  initialBoardState.push({ image: `assets/rook_${type}.png`, x: 0, y,type:PieceType.ROOK ,team:TeamType})
  initialBoardState.push({ image: `assets/rook_${type}.png`, x: 7, y ,type:PieceType.ROOK ,team:TeamType})
  initialBoardState.push({ image: `assets/knight_${type}.png`, x: 1, y,type:PieceType.KNIGHT ,team:TeamType})
  initialBoardState.push({ image: `assets/knight_${type}.png`, x: 6, y ,type:PieceType.KNIGHT,team:TeamType})
  initialBoardState.push({ image: `assets/bishop_${type}.png`, x: 2, y ,type:PieceType.BISHOP,team:TeamType})
  initialBoardState.push({ image: `assets/bishop_${type}.png`, x: 5, y  ,type:PieceType.BISHOP,team:TeamType})
  initialBoardState.push({ image: `assets/queen_${type}.png`, x: 3, y,type:PieceType.QUEEN ,team:TeamType})
  initialBoardState.push({ image: `assets/king_${type}.png`, x: 4, y ,type:PieceType.KING,team:TeamType})
}
  export default function ChessBoard() {
  const board = [];
  const refree=new Refree()
  const [gridx,setgridx]=useState(0)
  const [gridy,setgridy]=useState(0)
  const chessBoardRef = useRef<HTMLDivElement>(null)
  const [pieces,setpieces]=useState<Piece[]>(initialBoardState)
  const [activePiece,setActivePiece]=useState<HTMLElement | null>(null)

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let element = e.target as HTMLElement
    let chessboard = chessBoardRef.current
    if (element.classList.contains("chess-piece") && chessboard) {
      // console.log(e);  //give detail about chess piece on a tile

      setgridx(Math.floor((e.clientX-chessboard.offsetLeft)/75))
      setgridy(Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-600)/75)))
      let x = e.clientX - 37.5
      let y = e.clientY - 37.5
      element.style.position = "absolute"
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      setActivePiece(element)
    }
  }

  function movePiece(e: React.MouseEvent) {
    let element = e.target as HTMLElement
    // console.log(element);
    let chessboard = chessBoardRef.current
    if (activePiece && chessboard) {
      activePiece.style.position = "absolute"
      let minx = chessboard.offsetLeft-15
      let miny = chessboard.offsetTop-15
      let maxx=chessboard.offsetLeft+chessboard.clientWidth-60
      let maxy=chessboard.offsetTop+chessboard.clientHeight-60
      let x = e.clientX - 37.5
      let y = e.clientY - 37.5

      if(x<minx){
        activePiece.style.left = `${minx}px`
      }else if(x>maxx){
        activePiece.style.left = `${maxx}px`
      }else{
        activePiece.style.left = `${x}px`
      }

      if(y<miny){
        activePiece.style.top = `${miny}px`
      }else if(y>maxy){
        activePiece.style.top = `${maxy}px`
      }else{
        activePiece.style.top = `${y}px`
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    // console.log(e)
    let chessboard = chessBoardRef.current
    if (activePiece && chessboard) {
      const x=Math.floor((e.clientX-chessboard.offsetLeft)/75)
      const y=Math.abs(Math.ceil((e.clientY-chessboard.offsetTop-600)/75))
      console.log(x,y);
    
      //UPDATE THE PIECES POSITION
      setpieces((value)=>{
        const pieces=value.map((p)=>{
          if(p.x===gridx && p.y===gridy){
          const validMove=  refree.isValidMove(gridx,gridy,x,y,p.type,p.team,value)
          if(validMove){
            p.x=x
            p.y=y
          }else{
            activePiece.style.position='reltive'
            activePiece.style.removeProperty('left')
            activePiece.style.removeProperty('top')
          }
        }
          return p
        })
        return pieces
      })
      setActivePiece(null)
    }
  }


  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let number = j + i + 2;
      let image = undefined;
      pieces.forEach(p => {
        if (p.x === i && p.y === j) {
          image = p.image
        }
      })
      board.push(<Tile key={`${j}.${i}`} image={image} number={number} />)
    }
  }
  return (
    <div id='chessboard'
      onMouseDown={e => grabPiece(e)}
      onMouseMove={e => movePiece(e)}
      onMouseUp={e => dropPiece(e)}
      ref={chessBoardRef}
    >
      {board}
    </div>
  )
}
