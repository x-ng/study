## 1 计算属性和watch

- watch 和 computed 的区别：
      watch: 监视一个

  ​	 一个数据影响多个数据，可以直接修改 data 中定义过的属性( data 中定义过的数据变化后，其他使用到这个数据的都变化)
  ​    computed:监视多个

  ​	 一个数据收多个数据影响，不能计算在 data 中定义过的数据(直接在 html 上使用，其中使用到的 data 中的信息变化的时候，这个 html 上的值变化)，有缓存作用

- 代码：

<div>{{Name}}</div>
data(){
    return {
        num:0,
        lastname:'',
        firstname:'',
    }
}
//当num的值发生变化时，就会调用num的方法，方法里面的形参对应的是num的新值和旧值
watch:{
    num:function(val,oldval){
        console.log(val,oldval);
    }
},
//计算属性computed,计算的是Name依赖的值,它不能计算在data中已经定义过的变量。
computed:{
    Name:function(){
        return this.firstname+this.lastname;
    }
}

## 2 组件

### 2.1 定义方式：

#### 2.1.1 用 extent 定义

- 使用 vue.extend 定义组件模块

  ```js
  var dv = Vue.extend({
              template:'<div>我是一个组件</div>'
   })
  ```

- 使用 vue.component() 注册组件
   `Vue.component('com',dv)`

- 在 vue 托管的区域像 HTML 一样使用
  `<com></com>`

#### 2.1.2 使用vue.component() 定义

- 使用Vue.component定义组件

```js
  Vue.component('com',{
  template:'
  <div>
  <p>我是一个组件中的元素</p>
  <span>我也是组件中的元素</span>
  </div>'
  })

```

- 使用组件

    `<com></com>`

#### 2.1.3 使用 template 标签定义模板

- 使用Vue.component定义组件，并且使用选择器选择模板
      Vue.component('com',{
          template:'#temp'
      }) 

- 使用template标签定义模板,并且给template标签添加id

      <template id='tmpl'>
          <div>
              <p>我是p元素</p>
              <span>我是span元素</span>
          </div>
  ​    </template>

- 使用组件

      <com></com>

### 2.2 加载：

#### 2.2.1 局部注册

```js
var mycomponent = new extend({
<!--Vue.extend()是Vue构造器的扩展，调用Vue.extend()我们将创建一个组件构造器-->
 template:"<div>我是局部注册</>"
})

new Vue（{
el:"#app",
components:{                 <!--components是实现局部注册的属性-->
"my-component":mycomponent
}

}）
<!--这样我们组件就能应用在id=app的标签里面，其他地方不能应用,会报错！如果想组件在任何地方都能应用，我们就需要注册全局组件-->
```

#### 2.2.2 全局注册

```
var mycomponent  = new extend({
	template:"<div>我是全局组件，能在任何地方应用哦</div>"
})
Vue.component("my-compoent",mycomponent)    <!--这样就注册了一个全局组件-->
new Vue({
	el:"#app"
})
```
---------------
```
// 父组件包含子组件
<template id='father'>
    <div>
        <son></son>
    </div>
</template>
// 父组件
Vue.component('father',{
    template:'#father',
    components:{
        // 子组件
        son:{
            template:'<div>我是son组件</div>'
        }
    }
})
```

## 3 vuex 中的数据以及方法的调用

- state 中定义的数据: this.$store.state.count(count是computed)
- ​getter 中的定义的计算属性: this.$store.getter.***
- ​mutation 中的定义的方法: this.$store.commit('方法名',数据)
- ​action 中的定义的方法: this.$store.dispatch('方法名')
  ​	

	// 使用 vuex 实现的双向数据绑定(鬼才方法)
	// 绑定事件修改 vuex 绑定的数据
	// 讲 vuex 中的数据绑定到相应的标签
	
	<span class="fs-sm">
	    <input type="text" 
	     :value="brNewArr[0].courier_odd"  
	     @input="brCourierUpdateDate('courier_odd',0,$event)" 
	     class="input-text-active c-255-8"/>
	</span>
	
	// 双向绑定
	BR_COURIER_UPDATE_DATE(state,obj){
	    if(obj.type == "courier_odd"){
	        state.brNewArr.forEach(function(item,index){
	            item.courier_odd = obj.val;
	        })
	    }else{
	        state.brNewArr[obj.index][obj.type] = obj.val;
	    }     
	},



## 4 solt

- 内置的组件
- solt就是子组件里给DOM留下的坑位
- <子组件>DOM</子组件>
- solt动态的DOM,props是动态的数据

```
var MyLi = {
    template: `<li><solt></solt></li>`
}
Vue.component('my-li',MyLi)

// solt 就是父组件传递的DOM结构

// 入口文件
var App = {
    temlate: `

    	<div>
    		<ul>
    			<my-li>1</my-li>
				<my-li>1</my-li>
				<my-li>1</my-li>
				<my-li>1</my-li>
				<my-li>1</my-li>
				<my-li>1</my-li>
				<my-li><button>123</button></my-li>
				<my-li>2</my-li>
    		</ul>
   		</div>
    `
}
```

```
var MySolt = {
    template: `<li>
    			<solt name="one"></solt>
    			<solt name="two"></solt>
    		   </li>`
}
Vue.component('my-solt',MySolt)

// solt 就是父组件传递的DOM结构

// 入口文件
var App = {
    temlate: `

    	<div>
    		<ul>
    			// solt == 上面的name
    			<my-li solt="one">1</my-li>
				<my-li solt="two">2</my-li>
    		</ul>
   		</div>
    `
}
```

## 5 获取DOM元素

- document.querySelector
- 在template中标识元素 ref = "xxxx"
- 在获取的时候,this.$refs.xxxx 获取元素
  - 创建组件, 装载DOM, 用户点击按钮
- ref 在DOM 上获取的是原生的 DOM 对象
- ref 在组件上获取的是组件对象
  - $el 是拿DOM
  - 这个对象就相当于this

#### 路由

- 路由meta元数据 -> meta是对于路由规则时候需要验证权限的配置
  - 路由对象中和name属性同级{meta:{isChecked:true}}

- 路由钩子 -> 权限控制的函数执行时期
  - router.beforeEach(funciton(to,from,next){})

## 6 vue 各个组件

### 6.1 select

```
<select 
  v-model="selected"
  @change="changeUnitNew(selected)"
>
    <option
        v-for="(item,index) in selectList"
        :value="item.id"
    >{{ item.value }}</option>
</select>
<div>
  {{selected}}
</div>


data() {
  return {
    selectList: [
      {
        id: 100,
        value: "磅"
      },
      {
        id: 200,
        value: "码"
      },
      {
        id: 300,
        value: "米"
      }
    ],
  };
}

select v-model 绑定的是 option 中的 :value 的值, option 的标签中可以绑定属性
```

### 6.2 form

```
<body>
  <form>
    <input
    type="text"
    value=""
    v-model="name"
    placeholder="请输入用户名">

    <input
    type="text"
    value=""
    v-model="age"
    placeholder="请输入年龄">

    <input
    type="file"
    @change="getFile($event)">

    <button
    @click="submitForm($event)">提交</button>
  </form>

  <script>
    window.onload = function () {
      Vue.prototype.$http = axios;
      new Vue({
        el: 'form',
        data: {
          name: '',
          age: '',
          file: ''
        },
        methods: {
          getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
          submitForm(event) {
            event.preventDefault();
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('age', this.age);
            formData.append('file', this.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            this.$http.post('/upload', formData, config).then(function (res) {
              if (res.status === 2000) {
                /*这里做处理*/
              }
            })
          }
        }
      })
    }
  </script>
</body>
```

## 7 

