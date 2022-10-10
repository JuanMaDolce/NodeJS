

process.on('message', msg =>{
    if(!isNaN(msg) == true){
        for (var i = 0; i < msg; i++) {
            let x = Math.floor(Math.random()*1000);
            process.send(x)
          }
    } else {
        for (var i = 0; i < 5; i++) {
            let x = Math.floor(Math.random()*1000);
            process.send(x)
          }
    }

    process.exit()
})

process.send('listo')