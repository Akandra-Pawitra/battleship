(()=>{const e=e=>e<1||e>5?"Invalid length":{length:e,hits:0,sunk:0,hit:function(){this.hits++},isSunk:function(){return this.hits===this.length&&this.sunk++,Boolean(this.sunk)}},t=()=>({cells:function(){const e=[];for(let t=0;t<100;t++){const t={ship:null};e.push(t)}return e}(),attack:[],ships:{carrier:null,battleship:null,destroyer:null,submarine1:null,submarine2:null,patrol1:null,patrol2:null},place:function(t,o){let[l,c]=[[],null];if(o[1]-t[1])for(let e=0;e<o[1]-t[1]+1;e++)l.push([t[0],t[1]+e]);else for(let e=0;e<o[0]-t[0]+1;e++)l.push([t[0]+e,t[1]]);switch(l.length){case 5:c="carrier";break;case 4:c="battleship";break;case 3:c="destroyer";break;case 2:null===this.ships.submarine1?c="submarine1":null===this.ships.submarine2&&(c="submarine2");break;case 1:null===this.ships.patrol1?c="patrol1":null===this.ships.patrol2&&(c="patrol2")}null===this.ships[c]&&(this.ships[c]=e(l.length));for(let e=0;e<l.length;e++){const t=l[e][0]+10*l[e][1];this.cells[t].ship=c}},receiveAttack:function(e){const t=e[0]+10*e[1];if(this.attack.includes(t))return 1;{const e=this.cells[t].ship;return e&&(this.ships[e].hit(),this.ships[e].isSunk()),this.attack.push(t),0}},allSunk:function(){const e=[];for(const t in this.ships)e.push(t);const t=[];for(const o of e)this.ships[o]&&t.push(this.ships[o].sunk);return t.every((e=>1===e))}}),o={start:document.querySelector("#start"),wrapper:document.querySelector(".wrapper"),play:document.getElementById("play"),playercells:[...document.querySelectorAll(".player-cell")],botcells:[...document.querySelectorAll(".bot-cell")],playerShipSelection:{carrier:{button:document.querySelector(".ship button.carrier"),p:document.querySelector(".ship p.carrier")},battleship:{button:document.querySelector(".ship button.battleship"),p:document.querySelector(".ship p.battleship")},destroyer:{button:document.querySelector(".ship button.destroyer"),p:document.querySelector(".ship p.destroyer")},submarine:{button:document.querySelector(".ship button.submarine"),p:document.querySelector(".ship p.submarine")},patrol:{button:document.querySelector(".ship button.patrol"),p:document.querySelector(".ship p.patrol")}},disableSelection:function(){for(const e in o.playerShipSelection)o.playerShipSelection[e].button.setAttribute("disabled","")},enableSelection:function(){const e=[];for(const t in o.playerShipSelection)"x0"!==o.playerShipSelection[t].p.textContent&&e.push(t);if(0!==e.length)for(const t of e)o.playerShipSelection[t].button.removeAttribute("disabled");else l.attackPhase()},enableGrid:function(e){o.disableSelection();const t=[...document.querySelectorAll(".occupied")],l=[];for(const e of t)for(const t of o.playercells)t===e&&l.push(o.playercells.indexOf(t));if(e){for(let e=0;e<o.playercells.length;e++)o.playercells[e].setAttribute("disabled","");for(let t=0;t<e.length;t++)o.playercells[e[t]].removeAttribute("disabled")}else for(let e=0;e<o.playercells.length;e++)l.includes(e)||o.playercells[e].removeAttribute("disabled")}},l={playerBoard:t(),botBoard:t(),state:null,cache:{type:null,coor:[],length:null,valid:[]},attackPhase:function(){o.play.removeAttribute("disabled"),o.play.style.color="black",o.play.textContent="START",o.play.onclick=()=>{c.placeShip(),o.play.setAttribute("style","display: none"),l.state="attacking";const e=document.querySelectorAll(".bot-cell");for(const t of e)t.removeAttribute("disabled")}},selectShip:function(e,t){o.enableGrid(),l.cache.length=e,l.cache.type=t},sendData:function(e){if("placing"===l.state)if(l.cache.length>1){if(l.cache.coor.push(e),1===l.cache.coor.length){const t=l.cache.length,c=[...o.playercells],n=[...document.querySelectorAll(".occupied")];if(e[1]-1*t>=-1){const o=[];for(let l=1;l<t;l++)o.push(e[0]+10*(e[1]-l));let s=!1;for(const e of n)for(const t of o)if(c[t]===e){s=!0;break}s||l.cache.valid.push(o[0])}if(e[0]+1*t<=10){const o=[];for(let l=1;l<t;l++)o.push(e[0]+l+10*e[1]);let s=!1;for(const e of n)for(const t of o)if(c[t]===e){s=!0;break}s||l.cache.valid.push(o[0])}if(e[1]+1*t<=10){const o=[];for(let l=1;l<t;l++)o.push(e[0]+10*(e[1]+l));let s=!1;for(const e of n)for(const t of o)if(c[t]===e){s=!0;break}s||l.cache.valid.push(o[0])}if(e[0]-1*t>=-1){const o=[];for(let l=1;l<t;l++)o.push(e[0]-l+10*e[1]);let s=!1;for(const e of n)for(const t of o)if(c[t]===e){s=!0;break}s||l.cache.valid.push(o[0])}}else if(2===l.cache.coor.length){const t=l.cache.coor[0],o=t[0]+10*t[1],c=e[0]+10*e[1],n=[];switch(c-o){case 1:for(let e=1;e<l.cache.length-1;e++)n.push(c+1*e);break;case-1:for(let e=1;e<l.cache.length-1;e++)n.push(c+-1*e);break;case 10:for(let e=1;e<l.cache.length-1;e++)n.push(c+10*e);break;case-10:for(let e=1;e<l.cache.length-1;e++)n.push(c+-10*e)}l.cache.valid=n}if(o.playercells[e[0]+10*e[1]].setAttribute("class","occupied player-cell"),o.enableGrid(l.cache.valid),l.cache.coor.length===l.cache.length){const e=l.cache.coor,t=e[0],c=e[e.length-1],n=o.playerShipSelection[`${l.cache.type}`].p.textContent;o.playerShipSelection[`${l.cache.type}`].p.textContent="x2"===n?"x1":"x0",o.enableSelection(),l.playerBoard.place(t,c),l.cache.coor=[]}}else{const t=o.playercells;t[e[0]+10*e[1]].setAttribute("class","occupied player-cell");for(const e of t)e.setAttribute("disabled","");const c=o.playerShipSelection[`${l.cache.type}`].p.textContent;o.playerShipSelection[`${l.cache.type}`].p.textContent="x2"===c?"x1":"x0",o.enableSelection(),l.playerBoard.place(e,e)}}},c={shipPosition:[],getCoor:function(){return Math.floor(10*Math.random())},placeShip:function(){function e(e){if(1===e){let e=null;for(;;){const t=c.getCoor(),o=c.getCoor(),l=t+10*o;if(!c.shipPosition.includes(l)){c.shipPosition.push(l),e=[t,o];break}}return[e,e]}{let[t,o]=[null,null];if(2===e)for(;;){const e=c.getCoor(),l=c.getCoor(),n=e+10*l;if(!c.shipPosition.includes(n))if(Math.floor(2*Math.random())){const s=l+1;if(s<10){const i=e+10*s;if(c.shipPosition.includes(i))continue;t=[e,l],o=[e,s],c.shipPosition.push(n,i);break}}else{const s=e+1;if(s<10){const i=s+10*l;if(c.shipPosition.includes(i))continue;t=[e,l],o=[s,l],c.shipPosition.push(n,i);break}}}else for(;;){const l=c.getCoor(),n=c.getCoor(),s=l+10*n;if(!c.shipPosition.includes(s)){if(Math.floor(2*Math.random())){const i=n+(e-1);if(i<10){let r=!0;const a=[];for(let t=1;t<e;t++){const e=s+10*t;c.shipPosition.includes(e)&&(r=!1),a.push(e)}if(r){t=[l,n],o=[l,i],c.shipPosition.push(s,...a);break}continue}continue}{const i=l+(e-1);if(i<10){let r=!0;const a=[];for(let t=1;t<e;t++){const e=s+1*t;c.shipPosition.includes(e)&&(r=!1),a.push(e)}if(r){t=[l,n],o=[i,n],c.shipPosition.push(s,...a);break}continue}continue}}}return[t,o]}}const t=e(5),o=e(4),n=e(3),s=e(2),i=e(2),r=e(1),a=e(1);l.botBoard.place(t[0],t[1]),l.botBoard.place(o[0],o[1]),l.botBoard.place(n[0],n[1]),l.botBoard.place(s[0],s[1]),l.botBoard.place(i[0],i[1]),l.botBoard.place(r[0],r[1]),l.botBoard.place(a[0],a[1])}};!function(){o.start.onclick=(o.start.setAttribute("style","display: none"),o.wrapper.setAttribute("style","display: grid"),void(l.state="placing"));for(const e of o.playercells)e.onclick=()=>{const t=+e.value[0],o=+e.value[1];l.sendData([t,o])};o.playerShipSelection.carrier.button.onclick=()=>{l.selectShip(5,"carrier")},o.playerShipSelection.battleship.button.onclick=()=>{l.selectShip(4,"battleship")},o.playerShipSelection.destroyer.button.onclick=()=>{l.selectShip(3,"destroyer")},o.playerShipSelection.submarine.button.onclick=()=>{l.selectShip(2,"submarine")},o.playerShipSelection.patrol.button.onclick=()=>{l.selectShip(1,"patrol")}}()})();