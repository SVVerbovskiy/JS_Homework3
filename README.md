# Домашнее задание к занятию «Прототипы, ООП и функции высшего порядка»

### Задание 1

В отдельном файле с расширением .js написана программа, включающая в себя:

1. Определения классов:
- Good - класс для хранения данных о товаре со свойствами:
```
        id            Код товара
        name          Наименование
        description   Описание
        sizes         массив возможных размеров
        price         цена товара
        available     Признак доступности для продажи
```
В Good реализованы следующие методы:
```
        constructor()   конструктор экземпляра товара принимающий параметры соответствующие свойствам выше
        setAvailable()  изменение признака доступности для продажи
```
- GoodsList - класс для хранения каталога товаров со свойствами:
```    
        #goods       массив экземпляров объектов класса Good (приватное поле)
        filter       регулярное выражение используемое для фильтрации товаров по полю name
        sortPrice    булево значение, признак включения сортировки по полю Price
        sortDir      булево значение, признак направления сортировки по полю Price (true - по возрастанию, false - по убыванию)
```
В GoodsList реализованы геттер и методы:
```    
        get list()     возвращает массив доступных для продажи товаров в соответствии с установленным фильтром и сортировкой по полю Price
        add()          добавление товара в каталог
        remove(id)     удаление товара из каталога по его id
```     
Для фильтрации и сортировки используются функции массивов filter и sort с передачей в них соответствующих стрелочных функций.
            
- BasketGood - класс дочерний от Good, для хранения данных о товаре в корзине с дополнительным свойством:
```
        amount      количество товара в корзине
```
В конструктор данного класса в качестве параметра должен передаваться экземпляр класса Good (товар помещаемый в корзину), значения свойств которого должны использоваться при вызове конструктора родительского класса super().
- Basket - класс для хранения данных о корзине товаров со свойствами:
```
        goods       массив объектов класса BasketGood для хранения данных о товарах в корзине
```
Реализованы геттеры:
```
        get totalAmount()  возвращает общую стоимость товаров в корзине
        get totalSum()     возвращает общее количество товаров в корзине
```
При реализации геттеров использованы методы массивов reduce()
        
Реализованы методы:
```
        add(good, amount)    Добавляет товар в корзину, если товар уже есть увеличивает количество
        remove(good, amount) Уменьшает количество товара в корзине, если количество становится равным нулю, товар удаляется
        clear()              Очищает содержимое корзины
        removeUnavailable()  Удаляет из корзины товары, имеющие признак available === false (использовать filter())
```
2. В основном коде программы созданы  5 экземпляров класса Good. Созданы экземпляры классов GoodsList и Basket.
Вызваны несколько раз реализованные методы этих объектов с необходимыми аргументами, устанавливая условия фильтрации и сортировки для GoodsList.
Выведены в консоль отфильтрованный и сортированный каталог товаров, а также значения общих суммы и количества товаров в корзине.
