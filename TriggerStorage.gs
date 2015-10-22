/* global ScriptApp */

'use strict';

/**
 * TriggerStorage
 *
 * @name TriggerStorage
 * @description
 *  This is a module of Google Apps Script.
 *  This module supports storage system without any other storages like spreadsheets.
 *  Datum is saved as stringified-JSON in trigger's name.
 *  Yes, this is too dirty hack. If you found better solution, please teach me.
 *
 * @version 0.0.1
 * @author y.kikura(y.kikrua@gmail.com)
 * @license MIT
 */
var TriggerStorage = (function(exports) {

	/**
	 * @NOTE
	 * curry-bracket "}" is invalid function name, and not need to be escaped.
	 * So we can safely use it as 'not-normal-trigger-name'.
	 */
	var PREFIX = '}',
		storage = {};


	/**
	 * Save a value with specified key.
	 * @param {string} key the key
	 * @param {string|number|Object|Array|boolean} value the value to be saved.
	 */
	function setItem(key, value) {
		var name = createName(key, value);

		deleteTriggerByKey(key);
		storage[key] = value;

		ScriptApp.newTrigger(name)
			.timeBased()
			.atDate(3000, 1, 1)
			.create();
	}
	exports.setItem = setItem;


	/**
	 * Get the value saved with specified key.
	 * @param {string} key the key
	 * @return {string|number|Object|Array|boolean} the saved value.
	 */
	function getItem(key) {
		var triggers = ScriptApp.getProjectTriggers(),
			reg = createNameRegExp(key),
			ma, i, name;

		if (key in storage) return storage[key];

		for (i = 0; i < triggers.length; i++) {
			name = triggers[i].getHandlerFunction();
			if (!(ma = name.match(reg))) continue;

			return JSON.parse(ma[1]);
		}

		return null;
	}
	exports.getItem = getItem;


	/**
	 * Clear the value saved with specified key.
	 * @param {string} key the key
	 */
	function clearItem(key) {
		deleteTriggerByKey(key);
	}
	exports.clearItem = clearItem;


	/**
	 * Delete all triggers registered by TriggerStorage
	 */
	function clearItemAll() {
		var triggers = ScriptApp.getProjectTriggers(),
			reg = createNameRegExp(''),
			i, trigger;

		for (i = 0; i < triggers.length; i++) {
			trigger = triggers[i];

			if (reg.test(trigger.getHandlerFunction())) {
				ScriptApp.deleteTrigger(trigger);
			}
		}
	}
	exports.clearItemAll = clearItemAll;


	/**
	 * Return the trigger name with specified key and value.
	 * @param {string} key the key
	 * @param {string|number|Object|Array|boolean} value the value to be saved.
	 * @return {string} the trigger name with specified key and value.
	 * @private
	 */
	function createName(key, value) {
		return PREFIX + key + '/' + JSON.stringify(value);
	}


	/**
	 * Return the RegExp instance which matches specified key.
	 * @param {string} key the key
	 * @return {RegExp} the RegExp instance which matches specified key.
	 * @private
	 */
	function createNameRegExp(key) {
		return new RegExp('^' + PREFIX + key + '/' + '(.*)$');
	}


	/**
	 * Delete all triggers matched with specified key.
	 * @param {string} key the key
	 * @private
	 */
	function deleteTriggerByKey(key) {
		var triggers = ScriptApp.getProjectTriggers(),
			reg = createNameRegExp(key),
			i, trigger;

		for (i = 0; i < triggers.length; i++) {
			trigger = triggers[i];

			if (reg.test(trigger.getHandlerFunction())) {
				ScriptApp.deleteTrigger(trigger);
			}
		}
	}


	return exports;
})({});
