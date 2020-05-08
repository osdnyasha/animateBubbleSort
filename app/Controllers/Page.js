define('app/Controllers/Page.js', 
    ['app/Components/Component.js',
    'app/Components/BubleSort.js'], function(Component,Sort) {
        
        return class Page extends Component {

            constructor() {
                super();
                
                this.quantity = 10;
                this.sortArray = [];

                this.generateArr = this.generateArr.bind(this);
                this.startSort = this.startSort.bind(this);

                this.init();
            }

        
            /**
             * Вызов старта сортировки
             */
            async startSort() {
                this.hideArray(); // скрытие отсортированного массива
                const sort = new Sort(this.sortArray,this.quantity);
                this.removeEvents();// удаляет обработчики с кнопок во время сортировки
                await sort.bubbleSort();
                this.sortEnd(); // конец сортировки
            }
        
            showArr(arrayClass) {
                document.querySelector(arrayClass).innerHTML = '[ ';
                for(let i = 0; i < this.quantity; i++){
                    document.querySelector(arrayClass).innerHTML += this.sortArray[i] + " ";
                }
                document.querySelector(arrayClass).innerHTML += ']';
            }

            sortEnd() {
                document.querySelector(".newArray").style.display = "flex";
                this.showArr(".newArray__value");
                this.addEventsbtn();
            }

            hideArray() {
                document.querySelector(".newArray").style.display = "none";
            }
        
        
            getRandomArray() {
                this.sortArray = [];
                for(let i = 0; i < this.quantity; i++){
                    this.sortArray.push(this.getRandom(100));
                };
            }   
                
            getRandom(max) {
                return Math.floor(Math.random() * max);
            }
        
            addEventsbtn() {
                const generateBtn = document.querySelector('.generate');
                const sortBtn = document.querySelector('.startSort');
        
                generateBtn.addEventListener('click',this.generateArr);
                sortBtn.addEventListener('click', this.startSort);
            }

            removeEvents() {
                const generateBtn = document.querySelector('.generate');
                const sortBtn = document.querySelector('.startSort');
        
                generateBtn.removeEventListener('click',this.generateArr);
                sortBtn.removeEventListener('click', this.startSort);
            }

            init() {
                this.render(); 
                this.generateArr();
                this.addEventsbtn();
            }
        
            generateArr() {
                this.getRandomArray();
                this.showArr('.array__value');
                this.hideArray();
            }

            render() {
                document.body.innerHTML = 
                `<div class="container">
                    <header class="header">
                        <h1>Пузырьковая сортировка</h1>
                        <p class="header__info">Принцип действий прост: обходим массив от начала до конца, 
                        попутно меняя местами соседние элементы если предыдущий больше текущего.
                        В результате первого прохода на последнее место «всплывёт» максимальный элемент. 
                        Теперь снова обходим неотсортированную часть массива (от первого элемента до предпоследнего).
                        Второй по величине элемент окажется на предпоследнем месте. Продолжая в том же духе, будем обходить всё уменьшающуюся
                        неотсортированную часть массива, перестанавливая найденные максимумы в конец.
                        </p>
                        <p class="header__info">Для старта необходимо сгенерировать числа и начать сортировку. Во время сортировки кнопки не доступны.</p>
                    </header>
                    <div class="array__info">
                        <span>Исходный массив: </span>
                        <span class="array__value"></span>
                    </div>
                    <div class="array__info newArray">
                        <span>Отсортированный массив: </span>
                        <span class="newArray__value"></span>
                    </div>
                    <div class="sort"></div>
                    <div class="controls">
                        <button class="btn generate">Сгенерировать числа</button>
                        <button class="btn startSort">Начать сортировку</button>
                    </div>  
                </div>
                `;
            }
        }
    })