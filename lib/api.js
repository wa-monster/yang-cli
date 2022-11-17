const axios = require('axios')

// 全局拦截
axios.interceptors.response.use((res) => {
  return res.data
})

/**
 * 获取模板
 * @return Promise 
 * */
async function getYangRepo(repo) {
  return axios.get('https://gitee.com/api/v5/users/yang-ye123123/repos?type=all&sort=updated&direction=desc&page=1&per_page=20')
}
/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @return Promise 版本信息
 * */
async function getTagsByRepo(repo) {
  return axios.get(`https://gitee.com/api/v5/repos/yang-ye123123/${repo}/tags`)
}
module.exports = {
  getYangRepo,
  getTagsByRepo
}