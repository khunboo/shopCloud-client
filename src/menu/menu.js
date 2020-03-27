let menu = {};


/*
首页
 @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: '销售数据展示',
  path: '/',
  icon: 'fa fa-tachometer',
}

/* 
Charts
@type {{name: string, icon: string, children: {}}}
*/
menu.charts = {
  name: '销量统计',
  icon: 'el-icon-share',
  children: {}
}
let charts = menu.charts.children;
charts.line = {
  name: '折线图统计',
  path: '/charts_line'
};
charts.bar = {
  name: '柱状图统计',
  path: '/charts_bar'
}

/* 
map
@type {{name: string, icon: string, children: {}}}
*/
// menu.map = {
//   name: 'Map',
//   icon: 'el-icon-location-outline',
//   children: {}
// }
// let map = menu.map.children;
// map.baidu = {
//   name: '百度地图',
//   path: '/map_baidu'
// };

/* 
字体图标
@type {{name: string, icon: string, children: {}}}
*/
// menu.font_icon = {
//   name: '字体图标',
//   icon: 'fa fa-th',
//   children: {}
// };
// let icon = menu.font_icon.children;
// icon.font_awesome = {
//   name: 'FontAwesome 4.7',
//   path: '/font_awesome'
// };
// icon.element_icon = {
//   name: 'ElementIcon',
//   path: '/element_icon',
// }

/* 
内容管理
@type {{name: string, icon: string, children: {}}}
*/
menu.content_manage = {
  name: '销售商品管理',
  icon: 'fa fa-file-text-o',
  children: {}
}
let ContentManage = menu.content_manage.children;
ContentManage.post = {
  name: '购买商品管理',
  path: '/table_manage',
}

/**
 * 用户管理
 * @type {{name: string, icon: string, children: {}}}

menu.user_manage = {
  name: '用户管理',
  icon: 'fa fa-user-circle-o',
  children: {}
};
let UserManage = menu.user_manage.children;
UserManage.user = {
  name: '用户列表',
  path: '/user_manage',
};
 */
export default menu;
