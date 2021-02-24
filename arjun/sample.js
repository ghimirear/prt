
 var cardContainer = document.querySelector('.card-container2')

$(document).ready(function () {
    //https://api.themoviedb.org/3/search/movie/?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US&page=1&include_adult=true&query=salt

    // for video.
    // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US

    var myHeaders = new Headers();
    myHeaders.append("api-key", "f768a6c01320d0648fbd19db34d53112");
    var requestOptions = {
        method: 'GET',
        
    };
    fetch("https://api.themoviedb.org/3/search/movie/?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US&page=1&include_adult=true&query=salt",requestOptions)
        .then(response => response.json())
        .then(result => { 
            console.log(result);

        for (let i = 0; i < result['results'].length; i++) {


            var div = document.createElement('div');
            div.classList.add('card');
            // $('.card').width('300px'); 
            // $('.card').height('200px'); 
             var image = document.createElement('img');
            
            var imageCode = result['results'][i].poster_path
            if (result['results'][i].poster_path === null) {
                image.src = 'logo.PNG' 
             }
             else{ image.src = `https:image.tmdb.org/t/p/w300/${imageCode}`}
            
             image.classList.add('card-top-img')
             image.style.height = '300px';
             image.style.width = '300px'
             div.append(image);
             var cardBody = document.createElement('div')
             cardBody.classList.add('card-body');
             var h5 = document.createElement('h5');
             h5.classList.add('card-title');
             h5.textContent = result['results'][i].original_title;
             cardBody.append(h5);
            div.append(cardBody);
            // var description = result['results'][i].overview;
            // var res = description.slice(20, 10)
            // cardBody.append(description);
             var addBtn = document.createElement('button');
             addBtn.classList.add('btn')
             addBtn.classList.add('btn-primary')
             addBtn.textContent = 'add';
             var watchBtn = document.createElement('button');
              var watchId = result['results'][i].id
             watchBtn.setAttribute('movie-id', watchId)
             watchBtn.classList.add('watchButton')
             watchBtn.classList.add('btn');
             watchBtn.classList.add('btn-primary')
             //$('.watchButton').data('target', '#mymodal')
             watchBtn.setAttribute('data-target', '#mymodal')
             watchBtn.textContent ='watch';
            
           
             cardBody.append(addBtn, watchBtn)
            // $('.cardBody').width('350px');
           
            // cardBody.style.overflow = 'hidden';
            // card.append(cardBody);
            // card.classList.add('card');
            div.style.width = '200px'
             cardContainer.appendChild(div)
            
        }




        const watchButton = document.querySelectorAll('.watchButton');
        if(watchButton){
            watchButton.forEach((button)=>{
                button.addEventListener('click', (e) =>{
                    const id = e.target.getAttribute('movie-id');
                    const dataTarget = e.target.getAttribute('data-target');
                    console.log(dataTarget);
                    console.log(id)
                    var myHeaders = new Headers();
                    myHeaders.append("api-key", "f768a6c01320d0648fbd19db34d53112");
                    var requestOptions = {
                        method: 'GET',
                        
                    };
                    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f768a6c01320d0648fbd19db34d53112&language=en-US`,requestOptions)
                        .then(response => response.json())
                        .then(result => { 
                            console.log(result);
                             watchBtn.setAttribute('data-toggle', 'modal');
                            var link = result['results'][0].key;
                            var embed = `https://www.youtube.com/embed/${link}`
                            document.querySelector('.player').src= embed;
                            
                            
                         })
                
        
                })
            })
        }




        $('.card-container2').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
              
            ]
          });
        });






});


