/*
* @Author: linyajing
* @Date:   2017-06-24 10:13:20
* @Last Modified by:   linyajing
* @Last Modified time: 2017-06-24 11:05:09
*/

'use strict';
export function addClass(el, className) {
  if(!hasClass(el,className)){
    let newClass = el.className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
  }
}

export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
	return reg.test(el.className);
}