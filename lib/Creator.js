class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target
  }
  create() {
    console.log(this.name, this.target)

  }
}

module.exports = Creator