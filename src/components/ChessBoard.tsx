import React, { useEffect, useRef, useState } from 'react';
import Tile from './Tile.tsx';
import '../style/chessBoard.css';

const horizontalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const verticalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string
  x: number
  y: number
}
const initialBoardState:Piece[]=[]
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: 'assets/pawn_b.png', x: i, y: 6 })
  }
  for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: 'assets/pawn_w.png', x: i, y: 1 })
  }
  initialBoardState.push({ image: 'assets/rook_b.png', x: 0, y: 7 })
  initialBoardState.push({ image: 'assets/rook_b.png', x: 7, y: 7 })
  initialBoardState.push({ image: 'assets/rook_w.png', x: 0, y: 0 })
  initialBoardState.push({ image: 'assets/rook_w.png', x: 7, y: 0 })
  
  initialBoardState.push({ image: 'assets/knight_b.png', x: 1, y: 7 })
  initialBoardState.push({ image: 'assets/knight_b.png', x: 6, y: 7 })
  initialBoardState.push({ image: 'assets/knight_w.png', x: 1, y: 0 })
  initialBoardState.push({ image: 'assets/knight_w.png', x: 6, y: 0 })
  
  initialBoardState.push({ image: 'assets/bishop_b.png', x: 2, y: 7 })
  initialBoardState.push({ image: 'assets/bishop_b.png', x: 5, y: 7 })
  initialBoardState.push({ image: 'assets/bishop_w.png', x: 2, y: 0 })
  initialBoardState.push({ image: 'assets/bishop_w.png', x: 5, y: 0 })
  
  initialBoardState.push({ image: 'assets/queen_b.png', x: 3, y: 7 })
  initialBoardState.push({ image: 'assets/queen_w.png', x: 3, y: 0 })
  
  initialBoardState.push({ image: 'assets/king_b.png', x: 4, y: 7 })
  initialBoardState.push({ image: 'assets/king_w.png', x: 4, y: 0 })

export default function ChessBoard() {
  const [activePiece,setActivePiece]=useState<HTMLElement | null>(null)
  const [gridx,setgridx]=useState(0)
  const [gridy,setgridy]=useState(0)

  const chessBoardRef = useRef<HTMLDivElement>(null)
  const [pieces,setpieces]=useState<Piece[]>(initialBoardState)

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
      
      setpieces((value)=>{
        const pieces=value.map((p)=>{
          if(p.x===gridx && p.y===gridy){
            p.x=x
            p.y=y
          }
          return p
        })
        return pieces
      })
      setActivePiece(null)
    }
  }

  let board = [];

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
