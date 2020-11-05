import axios from 'axios';

const GifTrending = async (limit, offset, setOffset, setTrending, setData, setLoader, setTotalCount, content, setTrendSearch, title, setTitle) => {
try {
    let URL = `https://api.giphy.com/v1/gifs/trending?&api_key=${process.env.REACT_APP_API_KEY}&limit=${limit}&offset=${offset}`;
    let fetchGif = await axios(URL);
    let fetchRes = await fetchGif;
// SET STATE CONSOLE.LOG
if (fetchRes.status === 200) {
    // console.log(fetchRes)
    // SET DATA
    setData(fetchRes.data.data)
        // SET TOTAL COUNT
    setTotalCount(fetchRes.data.pagination.total_count)
        // SET LOAD FALSE
    setLoader(false)
        // SET RANDOM
    setTrending(true)
        // SET TITLE
    if (title !== 'Trending') {
        setTitle('Trending')
        if (offset > 0) {
            setOffset(0)
        }
    }
    // CALL NEW CONTENT
    content()
        // SET TREND TO FALSE
    setTrendSearch(false)
}
} catch (error) {
if (error) throw error;
}

}

export default GifTrending
