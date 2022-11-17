const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require('./Creator');
const {
  getYangRepo,
  getTagsByRepo
} = require('./api')
module.exports = async function (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDir = path.join(cwd, projectName)
  // 判断目录是否存在
  if (fs.existsSync(targetDir)) {
    // 判断是否使用 --force 参数
    if (options.force) {
      // 删除重名目录(remove是个异步方法)
      await fs.remove(targetDir)
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: 'isOverwrite',
          type: 'list',
          message: 'Target directory exists, Please choose an action',
          choices: [
            { name: 'Overwrite', value: true },
            { name: 'Cancel', value: false },
          ]
        }
      ])
      if (!isOverwrite) {
        console.log('cancel');
        return
      } else {
        console.log('overwrite');
        await fs.remove(targetDir)
      }
    }
  }
  // 选择模板
  async function getRepoInfo() {
    let repoList = await getYangRepo()
    console.log('repoList', repoList.length);
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
  async function getTagInfo(repo) {
    let tagList = await getTagsByRepo(repo)
    const tags = tagList.map(item => item.name)
    let { tag } = await new Inquirer.prompt([
      {
        name: 'tag',
        type: 'list',
        message: 'Please choose a version',
        choices: tags
      }
    ])
    console.log('你选择了', tag);
    return tag
  }
  const repo = await getRepoInfo()
  const tag = await getTagInfo()


  const creator = new Creator(projectName, targetDir)
  creator.create()
}