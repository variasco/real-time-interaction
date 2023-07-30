## Реализация real time client-server взаимодействия

1. Long polling
2. Event sourcing
3. Web sockets

Для запуска сервера с нужным способом нужно перейти в дирекорию сервера

```
cd ./server/
```

и выполнить команды, соответственно

```
npm run polling
```

```
npm run event
```

```
npm run ws
```

Для запуска клиента - перейти в директорию фронта

```
cd ./client/
```

В файле `/client/src/App.jsx` импортировать нужный компонент (`LongPolling.jsx`, `EventSourcing.jsx`, `WebSockets.jsx`)

Запустить сборку

```
npm run start
```
