import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Container, Spinner } from 'react-bootstrap';
import Download from './Images/Download.svg';
// import Home from './Images/Home.svg';
// import Heart from './Images/Heart.svg';
import Right from './Images/Right.svg';
import Left from './Images/Left.svg';
import Reset from './Images/Reset.svg';
import Search from './Components/Search';
import GifTrending from './Components/GifTrending';
import GifTrendingSearch from './Components/GifTrendingSearch';

const Gif = () => {
// Set States
const [data, setData] = useState([]);
const [title, setTitle] = useState('');
const [loader, setLoader] = useState(true);
const [offset, setOffset] = useState(0);
const [limit] = useState(8);
const [totalCount, setTotalCount] = useState(0);
const [search, setSearch] = useState('');
const [trending, setTrending] = useState(false);
const [trendSearch, setTrendSearch] = useState(false);
const [tSearch, setTsearch] = useState([]);

// FETCH
const fetchData = async (title) => {
  let URL = `https://api.giphy.com/v1/gifs/search?q=${title}&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${offset}`
  // TRY & CATCH
  try {
    let fetchGif = await axios(URL);
  // AWAIT PROMISE RESPONSE
    let fetchRes = await fetchGif;
    console.log(fetchRes);
  // CHECK RESPONSE
    if(fetchRes.status === 200) {
      // SET DATA STATE
        setData(fetchRes.data.data);
      // SET TOTAL COUNT
        setTotalCount(fetchRes.data.pagination.total_count);
      // SET LOADER FALSE
        setLoader(false);
      // CALL NEW CONTENT
      // content()
      if(trending) {
          setTrending(false)
      //RESET OFFSET
          setOffset(0);
      }
      // SET TREND SEARCH
        setTrendSearch(false);
    }
  } catch (err) {
    if (err) throw err;
  }
}

// USEEFFECT TO FETCH DATA ON OFFSET CHANGES FETCH NEW DATA
useEffect(() => {
  if(trending) {
    GifTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)
  }
  // IF TRENDING FALSE, FETCH NEW DATA
  if(!trending) {
    fetchData(title)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [offset])

// HANDLE DOWNLOAD
const handleDownload = (url) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = title.charAt(0).toUpperCase() + title.slice(1);
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }
  xhr.send()
}

// RENDER CONTENT

const content = () => {
  switch(true) {
    // IF LOADER IS TRUE, SHOW LOADING SPINNER
    case loader:
      return <div>
    <Container className="col text-center" fluid="md">
    {/* <h1>Loading...</h1> */}
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
    </Container>
      </div>
    // IF DATA ARRAY IS LOADED, LOOP THROUGH
    case data.length > 0:
    return data.map(g => {
      return (
        <div className="gif-card" key={g.id}>
          <details className="deets">
            <summary>
              Show
            </summary>
        <h5>{g.title !== undefined ? (g.title.charAt(0).toUpperCase() + g.title.slice(1)) : ''}</h5>
        <button className="gif-download" onClick={() => handleDownload(g.images.fixed_height.url)}>
          <img className="svg" src={Download} alt="download" ></img>
        </button>
          </details>
        <img className="image" onClick={() => handleDownload(g.images.fixed_height.url)} src={g.images.fixed_width.url} alt="gif" />
        </div>
      )
    });

  // OTHERWISE, RETURN DEFAULT DATA
  default:
    return data
  }
}

// ON TOP FUNC
const onTop = () => {
  let options = {top:0, left:0, behavior:"smooth"};
  window.scrollTo(options);
}

// HANDLE NEXT
const handleNext = () => {
  // SET LOAD
  setLoader(true);
  // ADD ONE PAGE
  setOffset(offset + limit);
  // GO TOP
  onTop();
}

// HANDLE PREVIOUS
const handlePrev = () => {
  // SET LOAD
  setLoader(true);
  // ADD ONE PAGE
  setOffset(offset - limit);
  // GO TOP
  onTop();
}


// RETURN
  return (
    <>
    <div>
      <header>
        <div className="gif-title">
        {/* <Router>
          <Route path="/" exact component={Homepage} />
        </Router> */}
          <h1 className="gif-title-h1">GYPHY</h1>
        </div>
        <div><strong>Search:</strong> {title}</div>
    <Search search={search} setSearch={setSearch} fetchData={fetchData} setTitle={setTitle} />
    <a href="/">
      <img src={Reset} alt="reset" className="svg"/>
    </a>
      </header>
    <Button variant="outline-info" className="gif-btn-trending" 
    onClick={() => GifTrending(limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle)}>
      Trending
    </Button>
    <Button variant="outline-info" className="gif-btn-trendsearch" onClick={() => trendSearch ? setTrendSearch(false) : GifTrendingSearch(setTrendSearch, trendSearch, setTsearch, setData)} >
      Trending Search
    </Button>

    <div className="gif-wrap">
      {
        trendSearch ?
        (
          <div className="gif-trend-search">
            <ul>
              {tSearch.map((trend, index) => <li key={index}> <strong>{index + 1}</strong> {trend.toUpperCase()}</li>)}
            </ul>
          </div>
        )
        :
        ''
      }
      {content()}
      </div>
      <div className="pagination">
        {
          totalCount === 0 ? '' : offset < limit ? <img className="svg" src={Right} alt="right" onClick={handleNext} />
          :
          offset >= totalCount ?
          <img className="svg" src={Left} alt="left" onClick={handlePrev} />
          :
          <>
          <img className="svg" src={Left} alt="left" onClick={handlePrev} />
          <img className="svg" src={Right} alt="right" onClick={handleNext} />
          </>
        }
      
    </div>
      <img width="100%" src="https://media.giphy.com/headers/2019-02-28-42-1551397358/whm-banner-web.gif" alt=""/>
    </div>
  </>
  )
}

export default Gif
