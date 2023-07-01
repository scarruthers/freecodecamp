// I really don't think the requirements of this exercise make since, having this.firstname and this.lastname
// seem much more logical than forcing an arbitrary requirement of only having 6 properties and being forced to use array manimpulation.
// But requirements aren't always what you want.

const Person = function(firstAndLast) {
    let fullName = firstAndLast;
  
    this.setFullName = function(name) {
      fullName = name;
    }
  
    this.setFirstName = function(name) {
      let arr = fullName.split(" ");
      arr[0] = name;
      fullName = arr.join(" ");
    }
  
    this.setLastName = function(name) {
      let arr = fullName.split(" ");
      arr[1] = name;
      fullName = arr.join(" ");
    }
  
    this.getFirstName = function() {
      return fullName.split(" ")[0];
    }
  
    this.getLastName = function() {
      return fullName.split(" ")[1];
    }
  
    this.getFullName = function() {
      let arr = fullName.split(" ");
      return `${arr[0]} ${arr[1]}`;
    };
  
    return firstAndLast;
  };
  
  const bob = new Person('Bob Ross');
  console.log(Object.keys(bob).length)
  bob.getFullName();