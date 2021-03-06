/* global TriggerStorage, ScriptApp, Logger */

'use strict';

/**
 * Sample of TriggerStorage
 *
 * @description
 *  run 'from()'
 *
 * @version 0.0.1
 * @author y.kikura(y.kikrua@gmail.com)
 * @license MIT
 */

function from() {
	//clear all trigger registered by TriggerStorage
	TriggerStorage.clearItemAll();


	//set data
	TriggerStorage.setItem('foo', {
		a: 1,
		b: true,
		c: (new Date()).toString()
	});

	//set trigger
	ScriptApp.newTrigger('to')
		.timeBased()
		.after(1000 * 20) //20seconds after.
		.create();

	//check on-memory storage
	TriggerStorage.setItem('buz', {
		message: "Hello World!"
	});
	Logger.log(TriggerStorage.getItem('buz').message);
}

function to() {
	//get data
	var data = TriggerStorage.getItem('foo');

	//check data
	Logger.log('to: data.a >> ' + data.a);
	Logger.log('to: data.b >> ' + data.b);
	Logger.log('to: data.c >> ' + data.c);

	//clear all trigger registered by TriggerStorage
	TriggerStorage.clearItemAll();
}
