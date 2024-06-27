const User = function (name) {
    this.name = name;
    this.discordName = "@" + name;
  }
  // hey, this is a constructor - 
  // then this can be refactored into a factory!
  
  function createUser (name) {
    const discordName = "@" + name;
    return { name, discordName };
  }
  // and that's very similar, except since it's just a function,
  // we don't need a new keyword

  const bruh = new User('bruh');
  console.log(bruh.discordName);