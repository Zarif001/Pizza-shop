

    // Burger
    const mainBurger = document.querySelector('.main__content-burger'),
        mainList = document.querySelector('.main__content-list'),
        mainClose = document.querySelector('.main__content-categories')

    mainBurger.addEventListener('click', () => {
        mainList.classList.add('active')
        mainBurger.classList.add('active')
    })
    mainClose.addEventListener('click', () => {
        mainList.classList.remove('active')
        mainBurger.classList.remove('active')
    })

    const renderItems = (arrItems) => {
        const mainTabContent = document.querySelector('.main__tabs-content')

        mainTabContent.innerHTML = ''

        
        arrItems.forEach(({ img, title, typeThin, typeTraditional, sizeMini, sizeMedium, sizeBig, price, addBtn }) => {
            const tabsItems = document.createElement('div')
            tabsItems.classList.add('main__tabs-items');

            tabsItems.innerHTML = `
    
            <div class="main__tabs-item">
            <img class="main__tabs-img" src= "${img}" alt="">
            <h4 class="main__tabs-title">${title}</h4>
            <div class="main__tabs-info"> 
            <a class="main__tabs-btn" href="">${typeThin}</a>
            <a class="main__tabs-btn" href="">${typeTraditional}</a>
            <a class="main__tabs-size" href="">${sizeMini}</a>
            <a class="main__tabs-size" href="">${sizeMedium}</a>
            <a class="main__tabs-size" href="">${sizeBig}</a>
            </div>
            <div class="main__tabs-add"> <span class="main__tabs-price"> от <span>${price}</span> ₽</span>
            <a class="main__tabs-addCart" href="">${addBtn}</a></div>
            </div> 
            `
            mainTabContent.appendChild(tabsItems)

        })

        const mainTabsBtn = document.querySelectorAll('.main__tabs-btn')
        const mainTabsSize = document.querySelectorAll('.main__tabs-size')

        mainTabsBtn.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                btnColor(i)
            })
        })
        function btnColor(index) {
            mainTabsBtn[index].classList.toggle('active')
        }

        mainTabsSize.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                sizeColor(i)
            })
        })
        function sizeColor(index) {
            mainTabsSize[index].classList.toggle('active')
        }

        const tabsCart = document.querySelectorAll('.main__tabs-addCart')
        let array = []
        
        tabsCart.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                cart.textContent++
                let parent = e.target.closest('.main__tabs-item')
                let img = parent.querySelector('.main__tabs-img')
                let span = parent.querySelector('.main__tabs-price span')
                let title = parent.querySelector('.main__tabs-title')
                let btn = parent.querySelector('.main__tabs-btn')
                let size = parent.querySelector('.main__tabs-size')
                let titleText = title.textContent
                let spanText = span.textContent + '₽'
                let btnText = btn.textContent
                let sizeText = size.textContent
                headerCartPrice.textContent = span.textContent * cart.textContent + '₽'
                array.push(titleText)
                array.push(spanText)
                array.push(img)
                array.push(btnText)
                array.push(sizeText)

                window.localStorage.setItem('arr', JSON.stringify(array))
            })  
        })
    }




    const mainContentLink = document.querySelectorAll('.main__content-link');
    let cart = document.querySelector('.header__cart-amount span')
    const cartButton = document.querySelector('.header__cart-button')
    cart.textContent = 0
    let headerCartPrice = document.querySelector('.header__cart-price')
    headerCartPrice.textContent = '0 ₽'

    cartButton.addEventListener('click', (e) => {
        if (cart.textContent > 0) {
            location.href = 'cart.html'
        } else {
            location.href = 'basket.html'
        }
        e.preventDefault()
    })


    mainContentLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            removeActiveClass()
            addActiveClass(link)
            const category = link.dataset.category
            getData(category)
        })
    })

    function removeActiveClass() {
        mainContentLink.forEach(link => {
            link.classList.remove('active')
        })
    }

    function addActiveClass(btn) {
        btn.classList.add('active')
    }





    const getData = async (category) => {
        await fetch('https://pizza-3ba7e-default-rtdb.firebaseio.com/db.json')
            .then(res => res.json())
            .then(data => {
                const arr = category ? data.filter((item) => item.category === category) : data
                if (category == undefined) {
                    data.pop()
                }
                renderItems(arr)
            })
    }

    getData()

