try {
    const mainContentSort = document.querySelector('.main__content-sort '),
    mainContentArrow = mainContentSort.querySelector('.main__content-arrow'),
    sortPopUp = document.querySelector('.main__content-sortPopup'),
    mainContentLi = document.querySelectorAll('.main__content-li'),
    mainContentSortInfo = document.querySelector('.main__content-sortInfo')

    mainContentSort.addEventListener('click', () => {
    if(sortPopUp.classList.contains('active')) {
        sortPopUp.classList.remove('active')
        mainContentArrow.style.transform = `rotate(0deg)`
    }else {
        sortPopUp.classList.add('active')
        mainContentArrow.style.transform = `rotate(180deg)`
    }
    })
const inderItems = (arrItems) => {
    const mainTabContent = document.querySelector('.main__tabs-content')

    mainTabContent.innerHTML = ''


    arrItems.forEach(({ img, title, typeThin, typeTraditional, sizeMini, sizeMedium, sizeBig, price, addBtn }) => {
        const tabsItems = document.createElement('div')

        tabsItems.classList.add('main__tabs-items');
        tabsItems.innerHTML = `

        <div class="main__tabs-item">
        <img class="main__tabs-img" src="${img}" alt="">
        <h4 class="main__tabs-title">${title}</h4>
        <div class="main__tabs-info"> 
        <a class="main__tabs-btn" href="">${typeThin}</a>
        <a class="main__tabs-btn" href="">${typeTraditional}</a>
        <a class="main__tabs-size" href="">${sizeMini}</a>
        <a class="main__tabs-size" href="">${sizeMedium}</a>
        <a class="main__tabs-size" href="">${sizeBig}</a>
        </div>
        <div class="main__tabs-add"> <span class="main__tabs-price">от ${price} ₽</span>
        <a class="main__tabs-addCart" href="">${addBtn}</a></div>
        </div> 
        `
        mainTabContent.appendChild(tabsItems)

    })
}

mainContentLi.forEach(item => {
    item.addEventListener('click', () => {
        mainContentSortInfo.innerHTML = item.innerHTML
        const sort = item.dataset.sort
        sortPrice()
        if(sort == 'популярности'){
            setData(sort)
        } else if (sort == 'цене'){
            sortPrice()
        } else if (sort == 'алфавиту'){
            sortAlfa()
        }
    })
})

const setData = async (popular, price) => {
    await fetch('https://pizza-3ba7e-default-rtdb.firebaseio.com/db.json')
        .then(res => res.json())
        .then(data => {
            let arr = popular ? data.filter((item) => item.popular === popular) : data      
            inderItems(arr)
        })
}
 const sortPrice = () =>{
     fetch('https://pizza-3ba7e-default-rtdb.firebaseio.com/db.json')
     .then(res => res.json())
     .then(data => {
         let arr = data.sort((itme1, item2) => +itme1.price - +item2.price)
         arr.pop()
         inderItems(arr)
     })
 }
 
 const sortAlfa = () =>{
     fetch('https://pizza-3ba7e-default-rtdb.firebaseio.com/db.json')
    .then(res => res.json())
    .then(data => {
      let arr = data.sort((item1, item2) =>{
          if(item1.title > item2.title) return 1
          if(item1.title < item2.title) return -1
          return 0 
      })
      arr.splice(5, 1)
      console.log(arr);
        inderItems(arr)
    })
 }
}catch(e){}