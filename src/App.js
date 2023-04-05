import { useState } from 'react';
import './App.css';
import img1 from './mgimages/alphasv.jpg'
import img2 from './mgimages/arcteryxbeanie.jpg'
import img3 from './mgimages/asics.jpg'
import img4 from './mgimages/betalt.jpg'
import img5 from './mgimages/betasv.jpg'
import img6 from './mgimages/betasvdistortion.jpg'
import img7 from './mgimages/nikesunder.jpg'
import img8 from './mgimages/nikevomero5.jpg'
import img9 from './mgimages/salomon.jpg'
import img10 from './mgimages/stussysocks.jpg'

const images = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10]

function dataObjsFunc() {
  const data = images.map(image => {
    return {
      image: image,
      name: image,
      isClicked: false,
      isMatch: false,
      id: Math.floor(Math.random() * 10000)
    }
  })
  return data.sort(() => Math.random() - 0.5)
}

function App() {
  const [dataObjs,setDataObjs] = useState(dataObjsFunc)
  const [checkingCardsArr,setCheckingCardsArr] = useState([])

  function flipCard(id) {
    setDataObjs(oldDataObjs => {
      return oldDataObjs.map(obj => {
        return obj.id === id ? {...obj,isClicked: !obj.isClicked} : obj
      })
    })
    const findCard = dataObjs.find(obj => obj.id === id)
    setCheckingCardsArr([...checkingCardsArr, findCard])
  }

  function checkingCardsFun() {
    if(checkingCardsArr.length === 2) {
      if(checkingCardsArr[0].name !== checkingCardsArr[1].name) {
        setTimeout(() => {
          checkingCardsArr.forEach(item => {
            setDataObjs(oldDataObjs => {
              return oldDataObjs.map(obj => {
                return item.id === obj.id ? {...obj,isClicked: false} : obj
              })
            })
          })
        },1500)
      } else {
        checkingCardsArr.forEach(item => {
          setDataObjs(oldDataObjs => {
            return oldDataObjs.map(obj => {
              return item.id === obj.id ? {...obj,isMatch: true} : obj
            })
          })
        })
      }
      setCheckingCardsArr([])
    }
  }

  function restartGame() {
    setDataObjs(dataObjsFunc())
  }

  if(dataObjs.every(obj => obj.isMatch)) {
    return (
      <div className='new-game'>
        <h1>GAME IS FINISHED!</h1>
        <button onClick={restartGame}>Play again?</button>
      </div>
    )
  }

  checkingCardsFun()
  return (
    <div className="App">
      {dataObjs.map(obj => {
        return (<div key={obj.id} onClick={() => flipCard(obj.id)} className={`card ${obj.isClicked ? 'clickedCard' : ''} ${obj.isMatch ? 'matchedCard' : ''}`}>
          <div className='front'>
            <img src={obj.image} alt="" />
          </div>
          <div className='back'></div>
        </div>)
      })}
    </div>
  );
}

export default App
