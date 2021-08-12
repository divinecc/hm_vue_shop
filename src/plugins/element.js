import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
//Message是弹框提示组件

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message  //注意这个message需要全局挂载，这样每一个组件都可以通过this来访问$message

