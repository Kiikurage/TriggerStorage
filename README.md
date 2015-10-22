# TriggerStorage

This is a module of Google Apps Script.
This module supports storage system without any other storages like spreadsheets.

## Why need?

Consider you want to run batch task periodicaly like this.

```js
var count = 0;

function batchTask(){
	count++;
	Logger.log(count);
}
```

This code outputs `1` everytime, because the variants is not passed next task.
So you must output the data to any-other persistent storage, like spreadsheets.
But if you use TriggerStorage, you can easily save the variants persitently!

## How to Install

Only a few step!

1. In the script editor, choose "Resources" -> "Libraries"
2. Input this project key `MsOwFFwYJdI9wGDxpSBrsCM1XrfRO61GJ` into "Find a Library", click "Select", and choose the latest version.
3. Now, this library has been included! click "Save" and develop your project.

## Methods

This module can be used like `localStorage`.

### `TriggerStorage.setItem(key, value)`

Set value with `key`. `value` muse be instance of `Number`, `String`, `Boolean`, `Object`, `Array`. (= JSON serializable type).


```js
TriggerStorage.setItem('foo', [1, 2, 3]);
```

### `TriggerStorage.getItem(key)`

Get value with `key`.

```js
var data = TriggerStorage.getItem('foo');
```

### `TriggerStorage.clearItem(key)`

Clear value with `key`.

```js
TriggerStorage.clearItem('foo');
```

### `TriggerStorage.clearItemAll()`

remove all triggers created by TriggerStorage

```js
TriggerStorage.clearItemAll();
```


## Sample

Please check [sample.gs](https://github.com/Kiikurage/TriggerStorage/blob/master/sample.gs);

## LICENSE

MIT

## NOTE

Of course this is too dirty hack. If you found better solution, please tell me!
