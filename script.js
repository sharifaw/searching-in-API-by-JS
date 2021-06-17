const searchInput = document.getElementById('search-input');
const button = document.getElementsByTagName('button')[0];
const div = document.getElementById("mainDiv");
const divDetails = document.getElementById("details");

let data = [];

searchInput.addEventListener('input',event => {
    button.disabled = true;
   
    if (!isNaN(event.target.value)){
        button.disabled = false;
    }
    if (event.target.value === ""){
        button.disabled = true;
    }
});

button.addEventListener("click",event =>
{   
    event.preventDefault();
    if (searchInput.value >100){
        alert("the number shoud be less than or equal to 100"); 
    }
    else{
        div.innerHTML="";
        div.insertAdjacentHTML("afterbegin",`<img id="loading" src="./Imges/spinner.gif" alt="">"`)
        
        fetch(`https://api.nasa.gov/planetary/apod?api_key=0b37pre4Depu0jUcAQSvbSWdEecH676vdpmU4qHp&count=${searchInput.value}`)
        .then(response =>{ return response.json()})
        .then(result =>{
            
            data = result;    
            document.getElementById("loading").remove();
            renderData(result); 
            console.log(data);
        
        });
    
    }
});

div.addEventListener('click', (event) =>{
    event.preventDefault();
    divDetails.innerHTML="";
    renderData(data.filter(data =>{
        if(event.target.parentNode.id == `${data.date}`){
            
            if(data.media_type == "image"){
                divDetails.insertAdjacentHTML("beforeend",`
                <a href="" id="x-btn">X</a>
                <h1>${data.title} (${data.media_type})</h1>
                <p id="explanation">${data.explanation}</p>
                <img src="${data.url}" alt=""> 
                `)    
            }
            else{
                divDetails.insertAdjacentHTML("beforeend",`
                <a href="" id="x-btn">X</a>
                <h1>${data.title} (${data.media_type})</h1>
                <p id="explanation">${data.explanation}</p>
                <a href="${data.url}" target="_blank"><span>to watch the video</span></a>
                <br><br>
                <a href="${data.url}" target="_blank">
                <img id="videoImg" class="img" src="./Imges/test.jpg">
                </a>
                <a href="${data.url}" target="_blank"><embed src="${data.url}" ></a> 
                `)
            }
            if(data.copyright){
             divDetails.insertAdjacentHTML("beforeend",`<h5>© Copyright ${data.copyright}</h5>`);
            }
        }

    }))
    let xBtn = document.getElementById('x-btn');
    xBtn.addEventListener('click',event =>{
        event.preventDefault();
        divDetails.innerHTML="";
    })
});

function renderData (data){
    for (dataType of data){
        console.log('thumbnail_url ',dataType.thumbnail_url);
       if(dataType.media_type === "image"){
           div.insertAdjacentHTML(`beforeend`,`<div id="${dataType.date}" class="div-container">
            <strong>${dataType.media_type}</strong>
            <embed class="img" src="${dataType.url}">
            <h4>${dataType.title}<br> ${dataType.date}</h4>
            </div>
           `)
        }
        else if (dataType.media_type === "video"){
            div.insertAdjacentHTML(`beforeend`,`<div id="${dataType.date}" class="div-container">
            <strong>${dataType.media_type}</strong>
            <img id="videoImg" class="img" src="./Imges/test.jpg">
            <embed class="img" src="${dataType.url}">
            <h4>${dataType.title}<br> ${dataType.date}</h4>
            </div>
           `)
        }
    }   
}