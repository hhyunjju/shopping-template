//Fetch the items from the JSON file
//JSON file에 있는 items 동적으로 받아오는 역할
function loadItems(){
    return fetch('data/data.json') //브라우저 api; response라는 객체 리턴
    .then(response => response.json())
    .then(json => json.items);
}
//items데이터 html요소로 변환해서 페이지에 표기
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}
function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));

}
function createHTMLString(item){//item받아와서 li태그로 만드는 함수
    return`
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail"/>
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key ==null || value==null){
        return;
    }
    displayItems(items.filter(item => item[key] === value));
    //updateItems(items, key, value);
}

//make the items matching {key: value} invisible.
function updateItems(items, key, value){
    items.forEach(item => {
        if(item.dataset(key)===value){
            item.classList.remove('invisible');
        }else{
            item.classList.add('invisible');
        }
    });
}

//main
// data.json에 있는 items읽어와서 데이터 전달
// promise성공적으로 되면 items받아오고 아니면 catch로 에러메세지 출력
loadItems()
.then(items => {
    displayItems(items);
    setEventListeners(items)
})
.catch(console.log);