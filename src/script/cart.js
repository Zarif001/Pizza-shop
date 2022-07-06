try {
    const basket = () => {

        const arr = JSON.parse(window.localStorage.getItem('arr'))

        console.log(arr);
        

        arr.forEach(({ img, titleText, spanText, btnText, sizeText }) => {
            const pizzaCheese = document.querySelector('.main__pizza-cheese')

            pizzaCheese.innerHTML = ''
            const pizzaAbout = document.createElement('div')
            pizzaAbout.classList.add('main__pizza-aboutCheese')
            pizzaAbout.innerHTML = `
            <div class="main__pizza-aboutPizza">
            <img class="main__pizza-img" src="${arr}" alt="">
            <div class="main__pizza-desctibtion">
                <h3 class="main__pizza-title">${arr[0]} </h3>
                <p class="main__pizza-describe">${arr[3]}, <span>${arr[4]}</span></p>
            </div>
            </div>
            <div class="main__pizza-cart">
           <img src="./images/minus.svg" alt="" data-symbol="-" class="main__pizza-symbol">
            <p class="main__pizza-number">2</p>
            <img src="./images/plus.svg" alt="" data-symbol="+" class="main__pizza-symbol">   
        </div>
        <p class="main__pizza-price"> ${arr[1]}</p>
        <a href="" class="main__pizza-cross"><img src="./images/cross.svg" alt=""></a>
            `

            pizzaCheese.appendChild(pizzaAbout)

    
        });
  
    }
    basket()


} catch (e) { }     