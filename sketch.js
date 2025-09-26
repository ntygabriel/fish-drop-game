let imgGato, imgGota, imgPeixe;
let gatoX, gatoY;
let gotas = [];
let peixes = [];
let pontuacao = 0;
let dificuldade;
let numGotas, numPeixes;
let alturaChao;

function preload() {
  imgGato = loadImage("assets/images/gato.png"); //100x100
  imgGota = loadImage("assets/images/gota.png"); //36x64
  imgPeixe = loadImage("assets/images/peixe.png"); //50x75
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  textSize(25);

  alturaChao = (5.7/6)*height; 

  gatoX = width / 2;
  gatoY = alturaChao - imgGato.height/2;
}

function draw() {
  background(205);

  fill(255);
  image(imgGato, gatoX, gatoY);
  
  ControlarGato();

  MudarDificuldade();
  
  QuedaGota(numGotas, 2 * dificuldade, 4 * dificuldade);
  QuedaPeixe(numPeixes, 2 * dificuldade, 4 * dificuldade);

  Colisao();

  if (pontuacao < 0) {
    pontuacao = 0
  }
  fill(0);
  text(`Pontuação: ${pontuacao}`, 20, 40);
  

  fill(208, 144, 98);
  quad(0, alturaChao, width, alturaChao, width, height, 0, height);
}

function ControlarGato() {
  if (keyIsDown(37) && gatoX > 50) {
    gatoX -= 8;
  }
  if (keyIsDown(39) && gatoX < width - 50) {
    gatoX += 8;
  }
}

function QuedaGota(quantidade, velMin, velMax) {
  while (gotas.length < quantidade) {
    gotas.push({
      posX: int(random(36, 736)),
      posY: -64,
      velocidade: int(random(velMin, velMax)),
    });
  }
  
  for (let i = gotas.length - 1; i >= 0; i--) {
    let gota = gotas[i];
    image(imgGota, gota.posX, gota.posY);
    if (gota.posY < height + imgGota.height) {
      gota.posY += gota.velocidade;
    } else {
      gota.posX = int(random(36, 736));
      gota.posY = -64;
      gota.velocidade = int(random(velMin, velMax));
    }
  }
}

function QuedaPeixe(quantidade, velMin, velMax) {
  while (peixes.length < quantidade) {
    peixes.push({
      posX: int(random(36, 736)),
      posY: -64,
      velocidade: int(random(velMin, velMax)),
    });
  }
  
  for (let i = peixes.length - 1; i >= 0; i--) {
    let peixe = peixes[i];
    image(imgPeixe, peixe.posX, peixe.posY);
    if (peixe.posY < height + imgPeixe.height) {
      peixe.posY += peixe.velocidade;
    } else {
      peixe.posX = int(random(36, 736));
      peixe.posY = -64;
      peixe.velocidade = int(random(velMin, velMax));
    }
  }
}

function Colisao() {
  for (let i = gotas.length - 1; i >= 0; i--) {
    let gota = gotas[i];
    if (
      gatoX - imgGato.width / 2 < gota.posX + imgGota.width / 2 &&
      gatoX + imgGato.width / 2 > gota.posX - imgGota.width / 2 &&
      gatoY - imgGato.height / 2 < gota.posY + imgGota.height / 2 &&
      gatoY + imgGato.height / 2 > gota.posY - imgGota.height / 2
    ) {
      gotas.splice(i, 1);
      pontuacao -= 2;
    }
  }
  for (let i = peixes.length - 1; i >= 0; i--) {
    let peixe = peixes[i];
    if (
      gatoX - imgGato.width / 2 < peixe.posX + imgPeixe.width / 2 &&
      gatoX + imgGato.width / 2 > peixe.posX - imgPeixe.width / 2 &&
      gatoY - imgGato.height / 2 < peixe.posY + imgPeixe.height / 2 &&
      gatoY + imgGato.height / 2 > peixe.posY - imgPeixe.height / 2
    ) {
      peixes.splice(i, 1);
      pontuacao += 1;
    }
  }
}


function MudarDificuldade() {
  if (pontuacao < 10) {
    dificuldade = 1.5;
    numPeixes = 4;
    numGotas = 2;
  } else if (pontuacao < 20) {
    dificuldade = 2;
    numPeixes = 3;
    numGotas = 3;
  } else if (pontuacao < 30) {
    dificuldade = 2.5;
    numPeixes = 2;
    numGotas = 4;
  } else if (pontuacao < 40) {
    dificuldade = 3;
    numPeixes = 1;
    numGotas = 5;
  } else if (pontuacao < 50) {
    dificuldade = 3.5;
    numPeixes = 1;
    numGotas = 5;
  }
}
