exports.install = function(Vue, options) {
  // 1.表单提交const submitForm
  Vue.prototype.$submitForm = (formRef, API, object, code, callback) => {
    // 参数说明 1、formRef用户自定义ref的名称 2、 API是用户调用的接口 3、 params是API的参数 4、 code是成功返回的状态码
    // 1.提交表单前的预先验证
    formRef.validate(async(value) => {
      console.log('预先验证表单结果：' + value)
      let res = null
      if (!value) return Vue.prototype.$message.error('提交失败！')
      // 预验证通过
      if (!object.id) {
        const { data: result } = await API(object.params)
        res = result
      } else {
        const { data: result } = await API(object.id, object.params)
        res = result
      }
      if (res.meta.status === code) {
        Vue.prototype.$message.success(res.meta.msg)
        if (callback) {
          callback()
        }
      } else {
        return Vue.prototype.$message.error(res.meta.msg)
      }
    }
    )
  }
  // 2.根据id删除
  Vue.prototype.$delById = async(id, API, callback) => {
    const { data: res } = await API(...id)
    Vue.prototype.$message.success(res.meta.msg)
    // 回调函数的用法！！！
    if (callback) {
      callback(res.data)
    }
  }

  // 3.获取列表
  Vue.prototype.$getList = async(API, params, callback) => {
    const { data: res } = await API(params)
    if (res.meta.status === 200) {
      callback(res.data)
    } else {
      Vue.prototype.$message.error(res.meta.msg)
    }
  }

  // 4.提交非表单内容(通用)
  Vue.prototype.$submitInfo = async(API, object, code, callback) => {
    let res = null
    if (!object.id) {
      const { data: result } = await API(object.params)
      res = result
    } else {
      const { data: result } = await API(object.id, object.params)
      res = result
    }
    if (res.meta.status === code) {
      Vue.prototype.$message.success(res.meta.msg)
      if (callback) {
        callback(res.data)
      }
    } else {
      return Vue.prototype.$message.error(res.meta.msg)
    }
  }
}
