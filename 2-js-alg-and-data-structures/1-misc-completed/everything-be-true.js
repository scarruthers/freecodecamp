function truthCheck(collection, pre) {
    let success = true;
    collection.forEach( (obj) => {
        if(Boolean(obj[pre]) === false) {
            success = false;
        }
    })
    return success;
  }
  console.log(
    truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "role")
  )
