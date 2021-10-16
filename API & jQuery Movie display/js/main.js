let movies = [];
let moviesDiv = document.getElementById("movies");
let links = document.getElementsByTagName("a");
let generalSearchBar = document.getElementById("generalSearchBar");
let localSearchBar = document.getElementById("localSearchBar");
let noPoster = 'imgs/noPoster.jpg'; 

for(var i=0; i<links.length-1; i++) //'-1' to not contain "contact US"
{
    links[i].addEventListener("click", function(e)
    {
        if(e.target.id == "trending")
        {
            getMovies(`https://api.themoviedb.org/3/trending/all/day?api_key=ca75b1e2e2321c7b02ed47b79ca5847f&language=en-US`);
        }
        else
        {
            getMovies(`https://api.themoviedb.org/3/movie/${e.target.id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3t9qCogkrf9EN-yKZDhYfJSMEifbm3ulbQe6r1am1-MltY9EgmT7sok74&language=en-US`)
        }
    });
}

async function getMovies(url=`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3t9qCogkrf9EN-yKZDhYfJSMEifbm3ulbQe6r1am1-MltY9EgmT7sok74&language=en-US`)
{
    var response = await fetch(url);
    if(response.status != 200)
    {
        alert("somthing wrong happend with the url address! please check the spelling")
        return false
    }
    else
    {
        movies = await response.json();
        movies = movies.results;
        display();
    }
}

function display()
{
    let movie = ``;
    for(var i=0; i<movies.length; i++)
    {
        posterSrc=`https://image.tmdb.org/t/p/w500//${ movies[i].poster_path }`;
        movie += 
            `<div class="col-lg-4 col-md-6 my-3">
                <div class="movie">
                    <div class="movieInfo">
                        <h3 class="mb-3"> ${movies[i].original_title || movies[i].original_name} </h3>
                        <p>${movies[i].overview}</p>
                        <p>Rate: ${movies[i].vote_average}</p>
                        <p>${movies[i].release_date || movies[i].first_air_date || ""}</p>
                    </div>
                    <img src=${ posterSrc || noPoster} class="w-100" alt="Movie Picture">
                </div>
            </div>`;
    }
    moviesDiv.innerHTML = movie;
}

localSearchBar.onkeyup = function ()
{
    let movie = ``;
    let searchVal = localSearchBar.value;
    for(var i = 0; i< movies.length; i++)
    {
        if(movies[i].original_title.toLowerCase().includes(searchVal.toLowerCase())) //filter could be used here.
        { 
            posterSrc=`https://image.tmdb.org/t/p/w500//${ movies[i].poster_path }`;
            movie+=
            `<div class="col-lg-4 col-md-6 my-3">
                <div class="movie">
                    <div class="movieInfo">
                        <h3 class="mb-3"> ${movies[i].original_title || movies[i].original_name} </h3>
                        <p> ${movies[i].overview}</p>
                        <p> Rate: ${movies[i].vote_average}</p>
                        <p> ${movies[i].release_date || movies[i].first_air_date}</p>
                    </div>
                    <img src=${posterSrc || noPoster} class="w-100" alt="Movie Picture">
                </div>
            </div>`;
        }
    }
    moviesDiv.innerHTML = movie;
}

generalSearchBar.onkeyup = function ()
{
    let searchVal = generalSearchBar.value;
    if(searchVal != '')
    {
        getMovies(`https://api.themoviedb.org/3/search/movie?api_key=ca75b1e2e2321c7b02ed47b79ca5847f&language=en-US&query=${searchVal}&page=1&include_adult=false`);
    }
}

//https://api.themoviedb.org/3/search/multi?api_key=ca75b1e2e2321c7b02ed47b79ca5847f&language=en-US&query=free&page=1&include_adult=false     //searching for people too
/* async function getAllMovies(query) //searching for better code.
{
   
    var response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ca75b1e2e2321c7b02ed47b79ca5847f&language=en-US&query=${query}&page=1&include_adult=false`);
    if(response.status != 200)
    {
        alert("somthing wrong happend with the url address! please check the spelling")
        return false
    }
    else
    {
        movies = await response.json();
        movies = movies.results;
        display();
    }
} */  //instead of repeating use url as a parameter ↑

getMovies();




$("#toggleIcon").click(function()
{
    let sideBar = $("#sideBar").outerWidth();
    let sideItems = $("ul").outerHeight();
    let animationDelay = [100,200,300,500,600,700];

    if($("#sideBar").css("left")=="0px")
    {
        $("#toggleIcon").html(`<i class="fas fa-align-justify fa-2x"></i>`);
        $("#sideBar").animate({"left": -sideBar }, 1000);
        for(var i = 0 ; i < 6; i++)
        {
            $("li").eq(5-i).delay(animationDelay[i]).animate({"bottom":-sideItems}, 1000);
        }
    }
    else
    {
        $("#toggleIcon").html(`<i class="fas fa-times fa-2x"></i>`);
        $("#sideBar").animate({"left":0}, 1000)
        for(var i = 0 ; i < 6; i++)
        {
            $("li").eq(i).delay(animationDelay[i]).animate({"bottom":0}, 1000);
        }
    }
})
