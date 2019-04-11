import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  Menu,
  MenuItem,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Timeline,
  TimelineItem,
  Card,
  Tag
} from "element-ui";
import service from "./utils/https";
import urls from "./utils/urls"
Vue.config.productionTip = false
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Message.name, Message);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Timeline.name, Timeline);
Vue.component(TimelineItem.name, TimelineItem);
Vue.component(Card.name, Card);
Vue.component(Tag.name, Tag);

Vue.prototype.$https = service
Vue.prototype.$urls = urls
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
