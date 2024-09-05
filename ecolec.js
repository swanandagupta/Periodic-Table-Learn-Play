function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
  
    return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    );
  }
  
  
  const player = document.getElementById("player");
  const coin = document.getElementById("coin");
  const scoreDiv = document.getElementById('score')
  const coinCollected = new Audio('./coin.mp3');
  let score = 0
  
  while (isTouching(player,coin)) {
      coin.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`
      coin.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`
  }
  
  window.addEventListener("keydown", function (event) {
    if (
      event.key === "ArrowDown" &&
      parseInt(getComputedStyle(player).top) < window.innerHeight - player.height
    ) {
      player.style.top = `${parseInt(getComputedStyle(player).top) + 30}px`;
    }
  
    if (event.key === "ArrowUp" && parseInt(getComputedStyle(player).top) > 30) {
      player.style.top = `${parseInt(getComputedStyle(player).top) - 30}px`;
    }
  
    if (
      event.key === "ArrowRight" &&
      parseInt(getComputedStyle(player).left) < window.innerWidth - player.width
    ) {
      player.style.left = `${parseInt(getComputedStyle(player).left) + 30}px`;
      player.style.transform = 'scale(1,1)'
    }
  
    if (
      event.key === "ArrowLeft" &&
      parseInt(getComputedStyle(player).left) > 30
    ) {
      player.style.left = `${parseInt(getComputedStyle(player).left) - 30}px`;
      player.style.transform = 'scale(-1,1)'
    }
      
    if (isTouching(coin,player)) {
      
      coin.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`
      coin.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`
      score += 1
      coinCollected.play()
      scoreDiv.innerHTML = `<span style="color: white;">Electrons collected: <span style="color: white;">${ score }</span>`
      
  }
  if (score === 14) {
    alert("Congratulations! You've collected 14 electrons,f orbital has only 14 electrons. Game Over!");
    // window.location.reload();
    window.location.href = "index1.html";
  }  
  });