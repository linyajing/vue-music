<template>
	<div class="singer">
    <list-view :data="singers"></list-view>
	</div>
</template>
<script>
  import {getSingerList} from 'api/singer';
  import {Singer} from 'common/js/singer.js';
  import ListView from 'base/listview/listview';
  const HOT_NAME= '热门';
  const HOT_SINGER_LEN = 10;
	export default {
    data() {
      return {
        singers: [],
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      _getSingerList() {
        getSingerList().then(res => {
          let singer = res.data.list;
          this.singers = this.normalizeSinger(singer);
        })
      },
      normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            item: []
          }
        };
        list.forEach((val,index) => {
          if(index < HOT_SINGER_LEN) {
            map.hot.item.push(new Singer({
              id: val.Fsinger_mid,
              name: val.Fsinger_name
            }));
          }
          let key = val.Findex;
          if(!map[key]) {
            map[key] = {
              title: key,
              item: []
            }
          }
          map[key].item.push(new Singer({
              id: val.Fsinger_mid,
              name: val.Fsinger_name
          }));
        });
        let hot = [];
        let ret = [];
        for(let key in map) {
          let val = map[key];
          if(val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if(val.title === HOT_NAME ) {
            hot.push(val);
          }
          ret.sort((a,b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          });
        }
        return hot.concat(ret);
      },
    },
    components: {
      ListView,
    },
	}
</script>
<style lang="scss" scoped>
	.singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
