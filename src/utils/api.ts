import axios from "axios"
import router from "@/router/index"
interface Data {
  [key: string]: any
}
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token")) {
      config.headers.token = sessionStorage.getItem("token")
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器，拦截请求没有权限的响应
axios.interceptors.response.use(
  (response: any) => {
    const msg = response.message ? response.message : "token过期"
    if (response.data.errorCode === -3 || response.data.errorCode === -5) {
      // 跳转到登录
      alert(msg)
      router.push("/")
      return
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

const fetchData = <S, T>(
  url = "",
  data = {} as Data,
  method = "GET"
): Promise<T> => {
  method = method.toUpperCase() // 将字符串转换为大写
  const reqdata = {} as Data
  Object.keys(data).forEach((key: string) => {
    if (![undefined, "全部"].includes(data[key])) {
      reqdata[key] = data[key]
    }
  })
  // 解析data = {} 里面的参数，转成JSONP格式
  if (method === "GET") {
    let dataStr = ""
    Object.keys(reqdata).forEach((key) => {
      if (!["", undefined, null].includes(reqdata[key])) {
        if (Array.isArray(reqdata[key])) {
          reqdata[key].forEach((item: string) => {
            dataStr += `${key}=${encodeURIComponent(item)}&`
          })
        } else {
          dataStr += `${key}=${encodeURIComponent(reqdata[key])}&` // 数据最终形式key1=data1&key2=data2&
        }
      }
    })
    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"))
      url = `${url}?${dataStr}` // get方法下降url转化为url?key=data形式
    }
    // 尝试从远程获取数据
    try {
      // 异步操作
      return new Promise((resolve, reject) => {
        axios.get(url).then(
          (response) => {
            const responseData = response.data
            resolve(responseData)
          },
          //新增
          (error) => {
            reject(error)
          }
        )
      })
    } catch (error) {
      throw new Error(error)
    }
  } else {
    // 非get方法，尝试获取数据
    const requestData = reqdata
    try {
      // 异步操作
      return new Promise((resolve, reject) => {
        const reqParam: Data = {
          method: method,
          url: url,
          data: requestData,
        }
        axios(reqParam).then(
          (response) => {
            resolve(response.data)
          },
          //新增
          (error) => {
            reject(error)
          }
        )
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}
interface Resp {
  errorCode?: number
  message?: string
  [key: string]: any
}

// eg
export const xx = (data: Data) =>
  fetchData<Data, Resp>("/api/xxx", data, "POST")

