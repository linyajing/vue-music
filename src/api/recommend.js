/*
* @Author: linyajing
* @Date:   2017-06-18 17:37:37
* @Last Modified by:   linyajing
* @Last Modified time: 2017-09-28 22:50:19
*/

'use strict';
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

//获取推荐数据的方法
export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	});
	return jsonp(url,data,options);
}