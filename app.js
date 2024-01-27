const videoCardContainer = document.querySelector('.videocontainer');

let api_key ="AIzaSyCiObMM8xXAk-9L2JwWLIRXQzxeU8MBZBg";
let video_http ="https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 40,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data =>{
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item)
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key:api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'" >
        <img src="${data.snippet.thumbnails.high.url}"  class="channel">
        <div class="cntnt">
            <img src="${data.channelThumbnail}"  alt="">
            <div class="cntnt-text">
                <h4>${data.snippet.title}</h4>
                <p>${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// ssearchbox

const searchInput = document.querySelector('.searchbar');
const searchBtn = document.querySelector('.searchbtn');
let searchLink ="https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
