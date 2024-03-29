# ***Проект Movies-explorer (бэкенд)***
Данный проект является дипломной работой на курсе веб-разработчик ***Яндекс.Практикума***.
## *Описание*
----
### ***О чём проект?***

Данное серверное приложение предназначено для хранения и обмена файлами с веб-приложением Movies-explorer.

***В нём представлены:***

* Модели (схемы) для базы данных;
* Контроллеры;
* Роуты.

---
## *Функциональность:*
* Регистрация;
* Авторизация;
* Обновление данных пользователя;
* Получение информации о текущем пользователе;
* Получение списка фильмов;
* Создание фильма;
* Удаление фильма;
* Обработка ошибок;
* Валидация входящих данных.
---
## *Используемые технологии:*

* Node.js
* Express.js
* MongoDB
* Mongoose
---
## *Планы по доработке*
* Запись токена в httpOnly куку.

---
## *Директории:*

`/routes` — папка с файлами роутера;

`/controllers` — папка с файлами контроллеров пользователя и фильма; 

`/models` — папка с файлами описания схем пользователя и фильма;

`/middlewares` — папка с мидлварами:
* аутентификация;
* центральный обработчик ошибок;
* логгер;
* валидация.

`/errors` — папка с кастомными ошибками;

`/utils` — папка с константами и файлом конфига.

---
## *Запуск проекта:*
`npm i` — установка зависимостей;

`mongod` — запускает mongodDB;

`npm run start` — запускает сервер;

`npm run dev` — запускает сервер с hot-reload.

---
## *Адрес сервера*

IPv4 (pub): 51.250.10.237
Запросы на бэкенд по: [https://api.movex.nomoredomains.sbs](https://api.movex.nomoredomains.sbs);
