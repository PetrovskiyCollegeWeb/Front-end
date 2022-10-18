import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useRef, useState} from "react";

const matrix = [
    [0,0,0,0,0,0,0],
    [0,8,0,0,0,0,0],
    [0,7,6,2,3,4,0],
    [0,0,0,1,0,5,0],
    [0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0],
]

const Home = ({maps}: {maps: any}) => {
    const canvasRef: any = useRef(null)

    const draw = (ctx: any) => {
        // for(let y = 0; y <= 300; y += 25) {
        //     ctx.moveTo(0, y);
        //     ctx.lineTo(300, y);
        //     ctx.stroke();
        // }
        //
        // for(let x = 0; x <= 300; x += 25) {
        //     ctx.moveTo(x, 0);
        //     ctx.lineTo(x, 300);
        //     ctx.stroke();
        // }

        canvasRef.current.addEventListener('mousedown', (e: any) => {
            const rect = canvasRef.current.getBoundingClientRect();
            const posX = Math.floor(e.clientX - rect.x);
            const posY = Math.floor(e.clientY - rect.y);

            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.fillRect(posX - (posX % 25), posY - (posY % 25), 25, 25);
            e.defaultPrevented
        })
    }

    useEffect(() => {
        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')

        draw(context)
    }, [canvasRef])
  return (
      <div className={styles.container}>
          <main className={styles.main}>
              <h1>Collage Maps</h1>
              <canvas ref={canvasRef} width={1000} height={1000} style={{background: 'white', border: 'white solid 2px'}}/>
          </main>
      </div>
    // <div className={styles.container}>
    //   <main className={styles.main}>
    //     <h1>Collage Maps</h1>
    //       <span style={{color: 'white'}}>{JSON.stringify(maps)}</span>
    //       {matrix.map((y, yy) => {
    //           return y.map((x, xx) => {
    //               // console.log(`x: ${xx * 50}`, `y: ${yy * 50}`)
    //               return maps.corpus[0].main["kb200"].map((item: any) => {
    //                   if (item === x) {
    //                       return <div style={{width: '50px', height: '50px', background:'red', position: 'absolute', zIndex: '99999', left: `${xx * 50}px`, top: `${yy * 50}px`}}></div>;
    //                   }else {
    //                       return <div style={{width: '50px', height: '50px', background:'white', position: 'absolute', left: `${xx * 50}px`, top: `${yy * 50}px`}}></div>;
    //                   }
    //               })
    //           })
    //       })}
    //   </main>
    // </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response: any = await axios.get('http://localhost:4025/api/v1/maps/get')
    const data = await response.data
    return {
      props: {
          maps: data || {}
      }
    }
}

export default Home
