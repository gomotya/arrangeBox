function ArrangeBox(containerId) {
    this.container = document.getElementById(containerId);
    this.availableValues = ["Чеддер", "Гауда", "Бри", "Камамбер", "Пармезан", "Дор Блю", "Эменталь", "Рокфор", "Моцарелла", "Грюйер", "Фета"];
    this.selectedValues = [];
    this.filterValue = '';
    this.sortAsc = true; // Флаг для отслеживания порядка сортировки (по возрастанию или убыванию)
  
    this.render = function() {
        this.container.innerHTML = `
            <div class="sort-box">
                <input type="text" id="filterInput" placeholder="Поиск по названию...">
                <button id="sortButton">А - Я</button>
            </div>
            <div class="arrange-box">
            <select id="availableValues" multiple>
                ${this.availableValues.map(value => `<option>${value}</option>`).join('')}
            </select>
            <select id="selectedValues" multiple>
                ${this.selectedValues.map(value => `<option>${value}</option>`).join('')}
            </select>
            </div>
            <div class="control-box">
                <button id="moveLeftButton">&lt;</button>
                <button id="moveAllLeftButton">&lt;&lt;</button>
                <button id="resetButton">Reset</button>
                <button id="moveAllRightButton">&gt;&gt;</button>
                <button id="moveRightButton">&gt;</button>
            </div>
            <div class="under-control-box">
                <input type="text" id="customValueInput" placeholder="Введите свое значение...">
                <button id="addCustomValueButton">Добавить</button>
                <button id="setRandomValuesButton">Случайные значения</button>
            </div>
        `;
  
        document.getElementById('moveRightButton').addEventListener('click', () => this.moveSelectedValues(true));
        document.getElementById('moveLeftButton').addEventListener('click', () => this.moveSelectedValues(false));
        document.getElementById('resetButton').addEventListener('click', () => this.reset());
        document.getElementById('moveAllRightButton').addEventListener('click', () => this.moveAllValues(true));
        document.getElementById('moveAllLeftButton').addEventListener('click', () => this.moveAllValues(false));
        document.getElementById('sortButton').addEventListener('click', () => this.sortValues());
        document.getElementById('addCustomValueButton').addEventListener('click', () => this.addCustomValue());
        document.getElementById('setRandomValuesButton').addEventListener('click', () => this.setRandomValues());

        const filterInput = document.getElementById('filterInput');
        filterInput.value = this.filterValue;
        filterInput.addEventListener('input', () => {
            this.filterValue = filterInput.value;
            this.filterValues(this.filterValue);
        });
    };
  
    this.addCustomValue = function() {
        const customValueInput = document.getElementById('customValueInput');
        const customValue = customValueInput.value.trim();
        if (customValue !== '' && !this.availableValues.includes(customValue) && !this.selectedValues.includes(customValue)) {
            this.availableValues.unshift(customValue);
            this.render();
        }
    };

    this.moveSelectedValues = function(moveRight) {
        const sourceSelect = moveRight ? document.getElementById('availableValues') : document.getElementById('selectedValues');
        const targetSelect = moveRight ? document.getElementById('selectedValues') : document.getElementById('availableValues');
        const selectedOptions = Array.from(sourceSelect.selectedOptions);

        selectedOptions.forEach(option => {
            const index = Array.from(sourceSelect.options).indexOf(option);
            targetSelect.appendChild(option);
            if (moveRight) {
                this.selectedValues.push(option.value);
                this.availableValues.splice(index, 1);
            } else {
                this.availableValues.push(option.value);
                this.selectedValues.splice(index, 1);
            }
        });
    };

    this.moveAllValues = function(moveAllRight) {
        const sourceSelect = moveAllRight ? document.getElementById('availableValues') : document.getElementById('selectedValues');
        const targetSelect = moveAllRight ? document.getElementById('selectedValues') : document.getElementById('availableValues');
        const allOptions = Array.from(sourceSelect.options);

        allOptions.forEach(option => {
            targetSelect.appendChild(option);
            if (moveAllRight) {
              this.selectedValues.push(option.value);
            } else {
              this.availableValues.push(option.value);
            }
          });
      
        if (moveAllRight) {
            this.availableValues = [];
        } else {
            this.selectedValues = [];
        }
    };
  
    this.reset = function() {
        this.availableValues = ["Чеддер", "Гауда", "Бри", "Камамбер", "Пармезан", "Дор Блю", "Эменталь", "Рокфор", "Моцарелла", "Грюйер", "Фета"];
        this.selectedValues = [];
        this.filterValue = '';
        customValueInput.value = ''; 
        this.render();
    };
  
    this.setAvailableValues = function(values) {
        this.availableValues = values;
        this.render();
    };
  
    this.setSelectedValues = function(values) {
        this.selectedValues = values;
        this.render();
    };

    this.sortValues = function() {
        if (this.sortAsc) {
            this.availableValues.sort((a, b) => a.localeCompare(b));
            this.selectedValues.sort((a, b) => a.localeCompare(b));
            document.getElementById('sortButton').textContent = 'Я-А';
            this.sortAsc = false;
        } else {
            this.availableValues.sort((a, b) => b.localeCompare(a));
            this.selectedValues.sort((a, b) => b.localeCompare(a));
            document.getElementById('sortButton').textContent = 'А-Я';
            this.sortAsc = true;
        }
      
        document.getElementById('availableValues').innerHTML = this.availableValues.map(value => `<option>${value}</option>`).join('');
        document.getElementById('selectedValues').innerHTML = this.selectedValues.map(value => `<option>${value}</option>`).join('');
      };
      
    this.filterValues = function(filterValue) {
        const filteredAvailableValues = this.availableValues.filter(value => value.toLowerCase().includes(filterValue.toLowerCase()));
        const filteredSelectedValues = this.selectedValues.filter(value => value.toLowerCase().includes(filterValue.toLowerCase()));
    
        document.getElementById('availableValues').innerHTML = filteredAvailableValues.map(value => `<option>${value}</option>`).join('');
        document.getElementById('selectedValues').innerHTML = filteredSelectedValues.map(value => `<option>${value}</option>`).join('');
    };
      
    this.getValues = function() {
        return {
            available: this.availableValues,
            selected: this.selectedValues
        };
    };

    this.setRandomValues = function() {
        console.log(Math.random()*10)
        const generateRandomValue = () => {
            const characters = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789';
            return characters.charAt(Math.floor(Math.random() * characters.length));
        };
      
        const randomValues = [];
        for (let i = 0; i < 10; i++) { 
            let randomValue = '';
            for (let j = 0; j < Math.random()*100; j++) { 
                randomValue += generateRandomValue();
            }
                randomValues.push(randomValue); 
        }
      
        this.availableValues = randomValues;
        this.selectedValues = [];
        this.render();
    };
      
  
    // Инициализация
    this.render();  
}
const arrangeBox = new ArrangeBox('arrangeBoxContainer');
  