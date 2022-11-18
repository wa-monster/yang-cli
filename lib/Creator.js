const downloadGitRepo = require('download-git-repo');
const path  = require('path')
const Inquirer = require("inquirer");
const util= require('util')
const fse = require('fs-extra')
const {
  getYangRepo,
  getTagsByRepo,
  loading
} = require('./api');
const chalk = require('chalk');
class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }
  async create() {
    console.log(this.name, this.target)
    try {
      const repo = await this.getRepoInfo()
      const tag = await this.getTagInfo(repo)
      // await fse.ensureDir(this.target)
      await this.dwonload(repo,tag)
      console.log(`\r\nSuccessfully create project ${chalk.cyan(this.name)}`)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    } catch (error) {
      
    }
  }
  // 选择模板
  async  getRepoInfo() {
    let repoList = await loading('等待查询模板\n', getYangRepo)
    const repos = repoList.map(item => item.name)
    let { repo } = await new Inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        message: 'Please choose a template',
        choices: repos,
      }
    ])
    console.log('你选择了', repo);
    return repo
  }
  // 获取版本信息和用户选择的版本
  async  getTagInfo(repo) {
    let tagList = await loading('等待查询版本\n', getTagsByRepo, repo)
    const tags = tagList.map(item => item.name)
    let { tag } = await new Inquirer.prompt([
      {
        name: 'tag',
        type: 'list',
        message: 'Please choose a version',
        choices: tags
      }
    ])
    console.log(`你选择了${repo}---${tag}`);
    return tag
  }
  async dwonload(repo,tag){
    // const templateUrl = `direct:https://gitee.com/yang-ye123123/${repo}${tag?'repository/archive/'+tag:''}`;
    const templateUrl = `wa-monster/${repo}${tag?'#'+'refs/tags/'+tag:''}`;
    // '/yang-ye123123/vue3-framework/repository/archive/v1.0.0'
    console.log('templateUrl',templateUrl);
    await loading('下载模板中',this.downloadGitRepo,templateUrl,path.join(process.cwd(),this.name))
  }
}

module.exports = Creator