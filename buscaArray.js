/*
 * Autor: Yuli Moreno
 * Este algoritmo busca el contenido del primer arreglo "arreglo_busca" en el segundo 
 * arreglo "arreglo", al encontrar el numero igual imprime el numero y su indice.*/

function buscaArray(array_1, array_2){
    var array =[]
    if(array_1.length == 0 || array_2.length ==0){
        console.log('Existe un arreglo vacio')
    }else{
        for(let i=0; i< array_1.length; i++){
            for(let j=0; j< array_2.length; j++){
                if(array_1[i] == array_2[j]){
                    array.push(j)
                    console.log(`${array_1[i]} se encuentra en la posicion ${array}`)
                }
                array=[]
            }
        }
    }
}

buscaArray([2,1,4,5], [1,2,2,3,5,7])

