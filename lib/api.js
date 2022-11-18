const axios = require('axios')
const ora = require('ora')
// 全局拦截
axios.interceptors.response.use((res) => {
  return res.data
})

/**
 * 睡觉函数
 * @param {Number} n 睡眠时间
 * */
function sleep(n) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, n)
  })
}

/**
  * loading加载效果
 * @param {String} message 加载信息
 * @param {Function} fn 加载函数
 * @param {List} args fn 函数执行的参数
 * @returns 异步调用返回值
 * */
async function loading(message, fn, ...args) {
  const spinner = ora(message)
  try {
    spinner.start();
    let executeRes = await fn(...args)
    spinner.succeed()
    return executeRes
  } catch (error) {
    console.log('error',error);
    spinner.fail("请求失败，重新拉起请求")
    // await sleep(1000)
    // return loading(message, fn, ...args)
  }
}


/**
 * 获取模板
 * @return Promise 
 * */
async function getYangRepo(repo) {
  return axios.get('https://api.github.com/users/wa-monster/repos')
}
/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @return Promise 版本信息
 * */
async function getTagsByRepo(repo) {
  `https://api.github.com/repos/OWNER/REPO/tags`
  const url = `https://api.github.com/repos/wa-monster/${repo}/tags`
  console.log(url);
  return axios.get(url)
}
module.exports = {
  getYangRepo,
  getTagsByRepo,
  loading
}