const Database = require ('../db/config')

module.exports = {
    async create(request, response) {
        const db = await Database()
        const password = request.body.password
        let roomId 

        // Criação da sala
        let isRoom = true

        while(isRoom){
            //Gera número da sala
          for (var i = 0; i < 6; i++) {
            i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
            roomId += Math.floor(Math.random() * 10).toString()
          }
          // Verifica se o número da sala ja existe no banco de dados
          const roomsExistIds =  await db.all(`SELECT id  FROM rooms`)
          isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId)

          if(!isRoom){
              /* Inserindo a sala no banco */
              await db.run(`INSERT INTO rooms (
                 id,
                 password
             ) VAlUES (
                 ${parseInt(roomId)},
                 "${password}"
             )`)
          }
        }
        await db.close()
        response.redirect(`/question-room/${roomId}`)
    },

    async open(request, response){
        const db = await Database()
        const roomId = request.params.room
        // Só traz as questões da sala q está em especifico.
        //Perguntas não lidas
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
         //Perguntas lidas
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

        let isNoQuestions 
        if(questions.length ==0) {
            if(questionsRead.length ==0) {
                isNoQuestions = true
            }
        }

        response.render('question-room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(request, response) {
        const roomId = request.body.roomId

        response.redirect(`/question-room/${roomId}`)
    }
}