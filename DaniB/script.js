var sportsBtn = document.getElementById("sports");
var musicBtn = document.getElementById("music");

var groupBtn = document.getElementById("group");
var miscellaneousBtn = document.getElementById("miscellaneous");
var artsBtn = document.getElementById("arts");
var nonticketBtn = document.getElementById("nonticket");
var filmBtn = document.getElementById("film");
var allEventsBtn = document.getElementById("allevents");
var attractionsBtn = document.getElementById("attractions");
var eventsContainer = document.querySelector('.events-container');

console.log("Connected");

let key = "jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca";
let zipCode = 20001;

// axios
//   .get(
//     `https://app.ticketmaster.com/discovery/v2/events.json?&postalCode=${zipCode}&apikey=${key}`
//   )
//     .then((res) => {
//       console.log("All events in DC")
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

musicBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .get(
      `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
    )
    .then((res) => {
        console.log("Music");
        console.log(res)
      console.log(res.data._embedded.events);
      $('.events-container').empty();
      for (let i = 0; i < res.data._embedded.events.length; i++) {
        console.log(res.data._embedded.events[i]);
        console.log(res.data._embedded.events[i].name);
        var card = document.createElement('div')
        card.classList.add('card');
        var h5 = document.createElement('h5');
        var name = res.data._embedded.events[i].name;
        h5.textContent = 'Name: '+ name;
        var cardBody = document.createElement('div')
        cardBody.classList.add('card-body');
        var image = document.createElement('img');
        var src = res.data._embedded.events[i].images[0].url;
        image.src = res.data._embedded.events[i].images[0].url;
        cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer');
        var venue = res.data._embedded.events[i]._embedded.venues[0].name;
        var h6 = document.createElement('h6');
        h6.textContent = 'Venue: '+ venue
        card.append(h5);
        cardBody.append(image);
        card.append(cardBody)
        cardFooter.append(h6);
        var date = res.data._embedded.events[i].dates.start.localDate;
        let addButton = document.createElement('button');
        addButton.classList.add('btn-primary');
        addButton.classList.add('add-button')
        addButton.textContent = 'add'; 
        cardFooter.append(date);
        var ticketLink = res.data._embedded.events[i]._embedded.venues[0].url
        var ticketButton = document.createElement('button');
        ticketButton.classList.add('btn-primary');
        ticketButton.classList.add('ticket-button');
        ticketButton.textContent = 'ticket';
        ticketButton.setAttribute('href', ticketLink )
        var a = document.createElement('a')
        a.setAttribute('href', ticketLink);
        a.setAttribute('target', 'blank')
        a.append(ticketButton);
        cardFooter.append(addButton);
        cardFooter.append(a);
        card.append(cardFooter);
        eventsContainer.append(card);
        // setting up dataAttribute for add button for backend
        addButton.setAttribute('event_date', date);
        addButton.setAttribute('event_name', name);
        addButton.setAttribute('event_venue',venue );
        addButton.setAttribute('image_src', src );
        addButton.setAttribute('ticket_url', ticketLink );

        

        // refreshing slick
        //  

      }
      const addbutton = document.querySelectorAll('.add-button');
      if(addbutton){
          addbutton.forEach((button)=>{
              button.addEventListener('click', (e) =>{
                  // console.log(e.target.parentNode);
                  // making one event object on the basis of api data.
                  const event = {
                      event_date :e.target.getAttribute('event_date'),
                      event_name : e.target.getAttribute('event_name'),
                      venue : e.target.getAttribute('event_venue'),
                      image_url : e.target.getAttribute('image_src'),
                      ticket_url: e.target.getAttribute('ticket_url'),
                    }; 
                    console.log(event);
                  // fetch(`/user/api/events`, {
                  //     method: 'PUT',
                  //     headers: {
                  //       Accept: 'application/json',
                  //       'Content-Type': 'application/json',
                  //     },
            
                  //     // make sure to serialize the JSON body
                  //     body: JSON.stringify(event),
                  //   }).then((response) => {
                  //     // Check that the response is all good
                  //     // Reload the page so the user can see the new quote
                  //     if (response.ok) {
                  //       console.log(`changed devour to: devoured`);
                  //       
                  //     } else {
                  //       alert('something went wrong!');
                  //     }
                  //   });
      
      
      
      
              }) 
          })
      }



    
      $('.events-container').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
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
      $(".events-container").slick("refresh");
      
    })
    
    .catch((err) => {
      console.log(err);
    });

    
});



// sportsBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Sports&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//         console.log("Sports");
// console.log(res.data);
//       console.log(res.data._embedded.events);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// groupBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Group&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("Group");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });


//   nonticketBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Nonticket&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("Nonticket");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });

//   miscellaneousBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Miscellaneous&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("Miscellaneous");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });

//   artsBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Arts & Theatre&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("Arts & Theatre");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });

//   filmBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/events.json?classificationName=film&postalCode=${zipCode}&apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("Film");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });

//   allEventsBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `  https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//       .then((res) => {
//         console.log("All Classifications")
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });

//   attractionsBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//   axios
//     .get(
//       `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=jlzdij2J5YYeKFbVYCwvGHZdsCGH2cca`
//     )
//     .then((res) => {
//       console.log("All Attractions");
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   });
