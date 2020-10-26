class Pet {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        return `${this.name} is eating`
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        super(name, age)
        this.livesLeft = livesLeft
    }
  miau() {
      return `${this.name} cat it sas MIAU`
  }
}

class Dog extends Pet{
    bark() {
        return `${this.name} dog it sas AVAVAV`
    }
}