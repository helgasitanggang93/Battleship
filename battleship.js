// Your code here
var Data = getData()

function getData(){
    const ship = [{
        kapal : 'A',
        size : 5
    },
    {
        kapal: 'B',
        size : 4
    },
    {
        kapal: 'C',
        size: 3
    },
    {
        kapal: 'D',
        size : 2
    }]

    return ship
}

function printBoard(){
    let kamus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let counter = 0
    let nomor = 10
    let board = []
    for (let i = 0; i < 11; i++) {
       let temp = []
       for (let j = 0; j < 11; j++) {
            if(j === 0 && i >= 0 && i < 10){
               temp.push(String(nomor))
               nomor--

           }else if(i === 10 && j > 0){
            temp.push(kamus[counter])
            counter++

           }else{
               temp.push(' ')

           }
           
       }
       board.push(temp)
        
    }
    return board
}

function diceRollPosisi(){
    let min = 0
    let max = 4
    var random = Math.floor( Math.random() * (+max - +min) + +min)
    return random
  }

  function getPosition(){
    let index = diceRollPosisi()
    const posisi = ['vertical', 'horizontal', 'diagonalkanan', 'diagonalkiri']
    return posisi[index]

}

function advance(){
    let arena = printBoard()
    for (let i = 0; i < Data.length; i++) {
        let RandomPos = getPosition()
        var flagVertical = false
        var flagHorizontal = false
        var flagDiagonalKanan = false
        var flagDiagonalKiri = false
        if(RandomPos === 'vertical'){
            while(flagVertical === false){

                let sizeVertical = arena.length - Data[i].size
                var indexIVer = ( Math.floor(Math.random() * sizeVertical) + 1)
                var indexJVer = ( Math.floor(Math.random() * sizeVertical) + 1)
                flagVertical = cekVertical(Data[i].size, indexIVer, indexJVer, arena)

            }

            if(flagVertical === true){
                launchShip(Data[i].kapal, indexIVer, indexJVer, arena, RandomPos, Data[i].size)

            }

        }else if(RandomPos === 'horizontal') {
            while(flagHorizontal === false){
                let sizeHorizontal = arena.length - Data[i].size
                var indexIHor = ( Math.floor(Math.random() * sizeHorizontal) + 1)
                var indexJHor = ( Math.floor(Math.random() * sizeHorizontal) + 1)
                flagHorizontal = cekHorizontal(Data[i].size, indexIHor, indexJHor, arena)

            }

            if(flagHorizontal === true){
                launchShip(Data[i].kapal, indexIHor, indexJHor, arena, RandomPos, Data[i].size)

            }

        }else if(RandomPos === 'diagonalkanan'){
            while(flagDiagonalKanan === false){
                let sizeDiagonalKanan = arena.length - Data[i].size
                var indexIDigKanan = ( Math.floor(Math.random() * sizeDiagonalKanan) + 1)
                var indexJDigKanan = ( Math.floor(Math.random() * sizeDiagonalKanan) + 1)
                flagDiagonalKanan = cekDiagonalKanan(Data[i].size, indexIDigKanan, indexJDigKanan, arena)

            }

            if(flagDiagonalKanan === true){
                launchShip(Data[i].kapal, indexIDigKanan, indexJDigKanan, arena, RandomPos, Data[i].size)

            }


        }else if(RandomPos === 'diagonalkiri'){
            while(flagDiagonalKiri === false){
                let sizeDiagonalKiri = arena.length - Data[i].size
                var indexIDigKiri = ( Math.floor(Math.random() * sizeDiagonalKiri) + 1)
                var indexJDigKiri = ( Math.floor(Math.random() * sizeDiagonalKiri) + 1)
                flagDiagonalKiri = cekDiagonalKiri(Data[i].size, indexIDigKiri, indexJDigKiri, arena)

            }

            if(flagDiagonalKiri === true){
                launchShip(Data[i].kapal, indexIDigKiri, indexJDigKiri, arena, RandomPos, Data[i].size)

            }
         

        }
          
    }
    return arena
    
}

function cekDiagonalKiri(dataSize, indexI, indexJ, arena) {
    let j = indexJ
    let jalan = dataSize + indexI
    for (let i = indexI; i < jalan; i++) {
        if (i !== jalan -1) {
            if(arena[i+1][j] !== ' ' || arena[i-1][j] !== ' '){
                return false
    
            }
        }else if(i === jalan-1){
            if (arena[i][j] !== ' ') {
                return false
                
            }
        }     
        j++
    }
    return true

    
}

function cekDiagonalKanan(dataSize, indexI, indexJ, arena) {
    let j = indexJ
    let jalan = dataSize + indexI
    for (let i = indexI; i < jalan; i++) {
        if(i !== jalan-1){
            if(arena[i+1][j] !== ' ' || arena[i-1][j] !== ' '){
                return false
    
            }

        }else if(i === jalan-1){
            if(arena[i][j] !== ' '){
                return false

            }
        }
        j--
    }
    return true

}


function cekVertical(dataSize, indexI, indexJ, arenaVertical){
    for (let i = indexI; i < indexI + dataSize; i++) {
            if(arenaVertical[i][indexJ] !== ' '){
                return false
            }
                
    }
    return true
}

function cekHorizontal(dataSize, indexI, indexJ, arenaHorizontal){
    for (let i = indexJ; i < indexJ + dataSize; i++) {
        if(arenaHorizontal[indexI][i] !== ' '){
            return false

        }           
    }
    return true
}

function launchShip(dataKapal, indexI, indexJ, arenaLaunch, PosLaunch, dataSize){
    if(PosLaunch === 'vertical'){
        for (let i = indexI; i < indexI + dataSize; i++) {
            arenaLaunch[i][indexJ] = dataKapal
            
        }

    }else if(PosLaunch === 'horizontal'){
        for (let i = indexJ; i < indexJ + dataSize; i++) {
            arenaLaunch[indexI][i] = dataKapal
            
        }

    }else if(PosLaunch === 'diagonalkanan'){
        let j = indexJ
        for (let i = indexI; i < indexI + dataSize; i++) {
            arenaLaunch[i][j] = dataKapal
            j--    
        }

    }else if(PosLaunch === 'diagonalkiri'){
        let j = indexJ
        for (let i = indexI; i < indexI + dataSize; i++) {
            arenaLaunch[i][j] = dataKapal
            j++ 
        }


    }
    
}



function bom(data){
    let board = advance()
    let kamus = 'ABCDEFGHIJ'
    let result = []

    for (let i = 0; i < data.length; i++) {
        let pecah = data[i].split('')
        let koorI = kamus.indexOf(pecah[0])

        result.push([koorI + 1, Number(pecah[1])])
    }

    let meledak = pasangBom(board, result)

    return meledak



}

function pasangBom(board, koordinat) {
    let hit = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    }
    for (let i = 0; i < koordinat.length; i++) {
        let indexI = koordinat[i][0]
        let indexJ = koordinat[i][1]
        if(board[indexI][indexJ] === 'A' || board[indexI][indexJ] === 'B' || board[indexI][indexJ] === 'C' || board[indexI][indexJ] === 'D'){
            hit[board[indexI][indexJ]] += 1
            board[indexI][indexJ] = 'X'
        }else {
            board[indexI][indexJ] = '0'
        }
        
    }
    console.log(`Air Craft Carier yang kena sejumlah: ${hit.A}`)
    console.log(`Battleship yang kena sejumlah: ${hit.B}`)
    console.log(`Cruiser yang kena sejumlah: ${hit.C}`)
    console.log(`Destroyer yang kena sejumlah: ${hit.D}`)
    return board
    
}

const command = process.argv.slice(2)
let data = command.slice(0)

console.log(bom(data));


