const countries=[
  {
    code:'FR',
    name:'France',
    continent:'Europe',
    maleFirst:['Jean','Pierre'],
    femaleFirst:['Emma','Marie'],
    last:['Dubois','Martin']
  },
  {
    code:'MA',
    name:'Maroc',
    continent:'Afrique',
    maleFirst:['Mohamed','Youssef'],
    femaleFirst:['Fatima','Salma'],
    last:['El Amrani','Benali']
  },
  {
    code:'JP',
    name:'Japon',
    continent:'Asie',
    maleFirst:['Haruto','Yuki'],
    femaleFirst:['Aiko','Yuki'],
    last:['Tanaka','Suzuki']
  },
  {
    code:'BR',
    name:'Brésil',
    continent:'Amérique du Sud',
    maleFirst:['João','Carlos'],
    femaleFirst:['Ana','Maria'],
    last:['Silva','Santos']
  },
  {
    code:'LB',
    name:'Liban',
    continent:'Asie',
    maleFirst:['Omar','Karim'],
    femaleFirst:['Nour','Layla'],
    last:['Haddad','Khoury']
  }
];

const startBtn=document.getElementById('startBtn');
const game=document.getElementById('game');
const home=document.getElementById('home');
const countrySelect=document.getElementById('country');
const genderSelect=document.getElementById('gender');
const createBtn=document.getElementById('createBtn');
const characterDiv=document.getElementById('character');
const matchDiv=document.getElementById('match');
const matchBtn=document.getElementById('matchBtn');
const partnerDiv=document.getElementById('partner');
const resultDiv=document.getElementById('result');
const xpFill=document.getElementById('xpFill');
const levelDiv=document.getElementById('level');
let xp=0;

startBtn.addEventListener('click',()=>{
  home.classList.add('hidden');
  game.classList.remove('hidden');
});

function flagEmoji(code){
  const base=0x1F1E6;
  return String.fromCodePoint(...code.split('').map(c=>base+c.charCodeAt(0)-65));
}

countries.forEach(c=>{
  const opt=document.createElement('option');
  opt.value=c.code;
  opt.textContent=c.name;
  countrySelect.appendChild(opt);
});

function randomFrom(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

function updateXP(){
  xpFill.style.width=`${xp%100}%`;
  levelDiv.textContent=`Niveau : ${Math.floor(xp/100)+1}`;
}

function displayCharacter(el,p){
  el.innerHTML=`<div>${flagEmoji(p.code)}</div><div>${p.first} ${p.last}</div>`+
    `<div>${p.gender==='male'?'Homme':'Femme'} - ${p.origin}</div>`;
  el.classList.remove('hidden');
}

createBtn.addEventListener('click',()=>{
  const code=countrySelect.value;
  const gender=genderSelect.value;
  const c=countries.find(x=>x.code===code);
  const first=gender==='male'?randomFrom(c.maleFirst):randomFrom(c.femaleFirst);
  const last=randomFrom(c.last);
  const player={...c,first,last,gender,origin:c.continent};
  displayCharacter(characterDiv,player);
  characterDiv.dataset.player=JSON.stringify(player);
  matchDiv.classList.remove('hidden');
  partnerDiv.classList.add('hidden');
  resultDiv.textContent='';
});

matchBtn.addEventListener('click',()=>{
  const player=JSON.parse(characterDiv.dataset.player);
  const others=countries.filter(c=>c.code!==player.code);
  const chosen=randomFrom(others);
  const gender=Math.random()>0.5?'male':'female';
  const first=gender==='male'?randomFrom(chosen.maleFirst):randomFrom(chosen.femaleFirst);
  const last=randomFrom(chosen.last);
  const partner={...chosen,first,last,gender,origin:chosen.continent};
  partnerDiv.innerHTML='';
  const marryBtn=document.createElement('button');
  marryBtn.textContent='Se marier';
  displayCharacter(partnerDiv,partner);
  partnerDiv.appendChild(marryBtn);
  partnerDiv.classList.remove('hidden');
  marryBtn.onclick=()=>{
    xp+=10;
    updateXP();
    resultDiv.textContent=`Mariage réussi avec ${partner.first} ${partner.last} (${partner.name}) ! +10 XP`;
    partnerDiv.classList.add('hidden');
  };
});

updateXP();
