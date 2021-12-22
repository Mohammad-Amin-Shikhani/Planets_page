let nav_button        = document.querySelectorAll("nav a");
let title             = document.title.toLowerCase()
let btns              = document.querySelectorAll(".buttons div")
let h1                = document.querySelector(".info h1")
let image_planet      = document.querySelector(".planet .pla")
let image_geo         = document.querySelector(".planet .geo")
//set x var to get an number to use it as index of array(data)
//set a color var to use it on bottuns
let x     = ""
let color = ""
switch(title){
    case "mercury":
        x     = 0;
        color = "#419ebb"
        break;
    case "venus":
        x     = 1;
        color = "#eda249"
        break;
    case "earth":
        x     = 2;
        color = "#6f2ed6"
        break;
    case "mars":
        x     = 3;
        color = "#d14c32"
        break;
    case "jupiter":
        x     = 4;
        color = "#d83a34"
        break;
    case "saturn":
        x     = 5;
        color = "#cd5120"
        break;
    case "uranus":
        x     = 6;
        color = "#1ec2a4"
        break;
    case "neptune":
        x     = 7;
        color = "#2d68f0"
        break;
}

//set a blue color for the nav item to know where are we
for(let i = 0; i < nav_button.length; i++) {
        if(window.location.href.includes(nav_button[i].getAttribute("href"))) {
            nav_button[i].style.color = "#4193bb"
        }
}

// import the data from json
async function get_data_from_json_file() {
    const response        = await fetch("data.json")
    const data            = await response.json()

    //set the main header of section info onload 
    h1.innerHTML = data[x].name;
    //set a standard text on load for overview section
    document.getElementById("overview").innerHTML = 
                    data[x].overview.content + 
                    `<p class="source">
                    Source: <a href="${data[x].overview.source}" target="tap">Wikipedia <i class="fas fa-external-link-square-alt"></i></a>
                    </p>`;
    //set the info for boxes in the bottom
    document.querySelector(".rotation h2").innerHTML    = data[x].rotation
    document.querySelector(".revolution h2").innerHTML  = data[x].revolution
    document.querySelector(".radius h2").innerHTML      = data[x].radius
    document.querySelector(".temperature h2").innerHTML = data[x].temperature
    //set the image of the planet
    image_planet.src = data[x].images.planet
    image_planet.alt = title + " image"
    image_geo.src    = data[x].images.geology
    image_geo.alt    = title + " geology image"
    //set a background color for the btn to know which info is showeing
    document.querySelector(".overview").style.backgroundColor = color
    //==================================================
    for(let i = 0; i < btns.length; i++) {

        btns[i].addEventListener("click", ()=> {

            var basis = btns[i].getAttribute("class");

            $(".planet_info").hide()
            $("#" + basis).fadeIn(1000).text(data[x][basis].content)

            document.getElementById(basis).innerHTML += `<p class="source">Source: <a href="${data[x][basis].source}" target="tap">Wikipedia <i class="fas fa-external-link-square-alt"></i></a></p>`

            $(".buttons div").css({backgroundColor: ""})
            $(".buttons ." + basis).css({backgroundColor: color})
            

            if(basis == "overview") {

                image_planet.src = data[x].images.planet
                $(image_geo).hide()

            } else if(basis == "structure") {

                image_planet.src = data[x].images.internal
                $(image_geo).hide()

            } else if (basis == "geology") {
                
                image_planet.src = data[x].images.planet
                $(image_geo).show(1000)
            }

            gsap.from(".planet .pla", { opacity: .01, duration: .5, rotationX : 360})

        })

    }
}
get_data_from_json_file()

$("nav").css({
    top : $("header").outerHeight()
})
$(".ham_menu").on("click", function(){
        $("nav").slideToggle()
})
$("nav li a").on("click", function() {
    if(document.title.toLowerCase() == $(this).text()){
        return false
    }
})
// // set animation to the page 
// gsap.from("header",  { opacity: 0, duration: 1, y: "-100%", ease:"bounce"})
// gsap.from(".planet .pla", { opacity: .01, duration: 1, rotationY : 360, delay: 1})
// gsap.from(".info",   { opacity: 0, duration: 1, x: "100%",delay: 2})
