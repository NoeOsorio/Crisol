


let getTemperature = function (temperatura_anterior, gas, ventilador) {
   return temperatura_anterior + 2 * gas - 2 - ventilador * 3
}

let warm = function(lastTemperature, gas, fan){
    let temp = getTemperature(lastTemperature, gas, fan)
    addFirestore({
        lastTemperature: lastTemperature,
        gas: gas,
        fan: fan,
        temperature: temp
    })
} 

function addFirestore(object){
    firebase.firestore().collection(new Date().toISOString).add(object)
}

let stop = function(){

}