define('app/Components/BubleSort.js', 
    ['app/Components/Component.js'], function(Component) {

        return class BubleSort extends Component {

            constructor(array,quantity) {
                super();
                this.arr = array;
                this.quantity = quantity;
                this.animationSpeed = 200; // время анимации
                this.delayTime = 500; // время задержки перед анимацией

                this.renderSortGallery();
            }

            /**
             * Алгоримт сортировки пузырьком
             *              * 
             */

            async bubbleSort() {

                for (let j = this.arr.length - 1; j > 0; j--) {
                  for (let i = 0; i < j; i++) {

                    this.showLastSorted(j); // показываю какие элементы были отсортированы
        
                    const sortItems = document.querySelectorAll('.sort__item');
                    await this.showCurrent(sortItems,i,i+1); // Подсвечиваю текущие элемента массива
        
                    if (this.arr[i] > this.arr[i + 1]) {

                        await this.animateBuble(sortItems,i,i+1); // вызов функции анимации
                        let temp = this.arr[i];
                        this.arr[i] = this.arr[i + 1];
                        this.arr[i + 1] = temp;       
                        
                    }
                    this.renderSortGallery(); // отрисовка массива
                  }
                  
                }
                this.showLastSorted(-1); // конец сортировки
              }

            /**
             * Анимации пузырьков
             * @param {*} sortItems - исходный массив
             * @param {*} i - текущий элемент массива
             * @param {*} j -следующий элемент массива
             */

            async animateBuble(sortItems,i,j) {

                await this.delay(this.animationSpeed);
                sortItems[i].style.top += "100px";
                sortItems[j].style.top += "-100px";
        
                await this.delay(this.animationSpeed);
                sortItems[i].style.right += "-100px";
                sortItems[j].style.right += "100px";
        
                await this.delay(this.animationSpeed);
                sortItems[i].style.top = "0px";
                sortItems[j].style.top = "0px";
        
                await this.delay(this.delayTime);
            }

            /**
             * Функция задержки
             * @param {*} ms - время в мс
             * @return возвращает промис.
             */
            async delay(ms) {
                return new Promise((resolve) => setTimeout(resolve,ms));
            }
           

            /**
             * 
             * Подсветка проверяемых элементов массива
             * @param {*} sortItems - исходный массив
             * @param {*} i - текущий элемент массива
             * @param {*} j -следующий элемент массива
             */
            async showCurrent(sortItems,i,j) {
                await this.delay(this.animationSpeed);
                sortItems[i].classList.add("active");
                sortItems[j].classList.add("active");
                await this.delay(this.animationSpeed * 2);
                await this.delay(this.delayTime);
            }
            


            renderSortContainer() {
                let sort = document.createElement("div");
                sort.classList.add("bubble");
                document.querySelector('.container').append(sort);
            }

            renderSortGallery() {
                let sortContainer = document.querySelector('.sort');
                if(!sortContainer){
                    this.renderSortContainer();
                }

                sortContainer.innerHTML = '';
                for(let i = 0; i < this.quantity; i++){
                    sortContainer.innerHTML += this.renderSortItem(this.arr[i]); 
                }
            }
            renderSortItem(number) {
                return `<div class="sort__item">${number}</div>`
            }

            /**
             * Подсвечивает проверенные элементы массива
             * @param {*} index - индекс последнего проверенного элемента 
             */
            showLastSorted(index) {
                const sortItems = document.querySelectorAll('.sort__item');
                for(let i = this.arr.length -1 ; i > index; i--) {
                    sortItems[i].classList.add('finished');
                }
            }

            
        }
});