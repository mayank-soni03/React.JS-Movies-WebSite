import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const loadAll = async () => {
    
    let list = await Tmdb.getHomeList();
    console.log(list);
    setMovieList(list);
    
    let originals = list.filter(i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
    
    console.log('@@@ choseInfo data' ,chosenInfo);
  }

  const scrollListener = () => {
    if (window.scrollY > 10) {
      setBlackHeader(true);
    } else {
      setBlackHeader(false);
    }
  }

  useEffect(() => {
    loadAll();
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
    
  }, []);

  return (
    <>
    <div className='page'>
      <Header black={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData} />}
      <section className='lists'>
        {movieList.map((item, key) => (<MovieRow key={key} title={item.title} items={item.items} />))}
      </section>

      <footer>
      Images rights for Netflix<br></br>
        API site is themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' size={13}></img>
        </div>
      }
    </div>
    </>
  )
}



// import {BrowserRouter, Routes, Route, } from "react-router-dom";
// import Add from "./Browserpages/Add";
// import Update from "./Browserpages/Update";
// import Movies from "./Browserpages/Movies";
// import "./Style.css"


// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Movies/>}/>
//         <Route path="/add" element={<Add/>}/>
//         <Route path="/update/:id" element={<Update/>}/>
//       </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }


// export default App;