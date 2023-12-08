let drag = false;
document.addEventListener('mousedown', () => drag = false);      
document.addEventListener('mousemove', () => drag = true);
document.addEventListener('mouseup', () => drag ? console.log('drag') : console.log('click')); //window.location=pageName);

function showTitle(titleName) {
	document.getElementById("description").innerHTML = titleName;
  // const bgStyle = document.body.style;
  // switch(titleName) {
  //   case "About me":
  //     bgStyle.backgroundImage = "url('./assets/profile_img.jpg')";
  //     break;
  //   case "Skillset":
  //     bgStyle.backgroundImage = "url('./assets/skills_img.jpg')";
  //     break;
  //   case "Services":
  //     bgStyle.backgroundImage = "url('./assets/services_img.jpg')";
  //     break;
  //   case "Contact":
  //     bgStyle.backgroundImage = "url('./assets/contact_img.jpg')";
  //     break;
  //   default:
  //     bgStyle.backgroundImage = "url('./assets/black.jpg')";
  //     break;
  // }
}

function userClick(pageName) {
	drag? null: window.location=pageName;
}

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);