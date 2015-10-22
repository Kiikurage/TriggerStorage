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

/**
 * @NOTE
 * curry-bracket "}" is invalid function name, and not need to be escaped.
 * So we can safely use it as 'not-normal-trigger-name'.
 */
var PREFIX_ = '}';

var storage_ = {};


/**
 * Save a value with specified key.
 * @param {string} key the key
 * @param {string|number|Object|Array|boolean} value the value to be saved.
 */
function setItem(key, value) {
	var name = createName_(key, value);

	deleteTriggerByKey_(key);
	storage_[key] = value;

	ScriptApp.newTrigger(name)
		.timeBased()
		.atDate(3000, 1, 1)
		.create();
}


/**
 * Get the value saved with specified key.
 * @param {string} key the key
 * @return {string|number|Object|Array|boolean} the saved value.
 */
function getItem(key) {
	var triggers = ScriptApp.getProjectTriggers(),
		reg = createNameRegExp_(key),
		ma, i, name;

	if (key in storage_) return storage_[key];

	for (i = 0; i < triggers.length; i++) {
		name = triggers[i].getHandlerFunction();
		if (!(ma = name.match(reg))) continue;

		return JSON.parse(ma[1]);
	}

	return null;
}


/**
 * Clear the value saved with specified key.
 * @param {string} key the key
 */
function clearItem(key) {
	deleteTriggerByKey_(key);
}


/**
 * Delete all triggers registered by TriggerStorage
 */
function clearItemAll() {
	var triggers = ScriptApp.getProjectTriggers(),
		reg = new RegExp(PREFIX_),
		i, trigger;

	for (i = 0; i < triggers.length; i++) {
		trigger = triggers[i];

		if (reg.test(trigger.getHandlerFunction())) {
			ScriptApp.deleteTrigger(trigger);
		}
	}
}


/**
 * Return the trigger name with specified key and value.
 * @param {string} key the key
 * @param {string|number|Object|Array|boolean} value the value to be saved.
 * @return {string} the trigger name with specified key and value.
 * @private
 */
function createName_(key, value) {
	return PREFIX_ + key + '/' + JSON.stringify(value);
}


/**
 * Return the RegExp instance which matches specified key.
 * @param {string} key the key
 * @return {RegExp} the RegExp instance which matches specified key.
 * @private
 */
function createNameRegExp_(key) {
	return new RegExp('^' + PREFIX_ + key + '/' + '(.*)$');
}


/**
 * Delete all triggers matched with specified key.
 * @param {string} key the key
 * @private
 */
function deleteTriggerByKey_(key) {
	var triggers = ScriptApp.getProjectTriggers(),
		reg = createNameRegExp_(key),
		i, trigger;

	for (i = 0; i < triggers.length; i++) {
		trigger = triggers[i];

		if (reg.test(trigger.getHandlerFunction())) {
			ScriptApp.deleteTrigger(trigger);
		}
	}
}
