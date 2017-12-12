/*
* @Author: linyajing
* @Date:   2017-06-18 17:37:37
* @Last Modified by:   linyajing
* @Last Modified time: 2017-09-28 22:50:19
*/

'use strict';
import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options} from './config'

//获取轮播图推荐数据的方法
export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	});
	return jsonp(url,data,options);
}

// 获取歌单数据
export function getDiscList() {
  const url = '/api/getDiscList';
  const data = Object.assign({},commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
