'use strict';
const displayList = document.querySelector('.items');

// json 파일에서 데이터 가져오는 함수
function readItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

// 데이터를 HTML로 변환하여 display 하는 함수
function displayItems(items) {
  const itemBox = [];
  for (let i in items) {
    // itemBox.push(makeHTML(items[i]));
    itemBox.push(makeHTML(items[i]));
  }
  displayList.innerHTML = itemBox.join('');
}

//개별 아이템의 value를 이용해서 HTML 문장으로 리턴하는 함수
function makeHTML(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_img">
    <span class="description">${item.gender}, ${item.size}</span>
  </li>`;
}

// btn evnent 처리하는 기능을 부여하는 함수

function btnsEvents(items) {
  const logo = document.querySelector('.logo');
  const btns = document.querySelector('.btns');
  logo.addEventListener('click', () => displayItems(items));
  btns.addEventListener('click', (event) => filterItems(event, items));
}

//
function filterItems(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  displayItems(items.filter((item) => item[key] === value));
  //object 사용법 다시보기
}

// main
readItems()
  .then((items) => {
    displayItems(items);
    btnsEvents(items);
  })
  .catch(console.log);
