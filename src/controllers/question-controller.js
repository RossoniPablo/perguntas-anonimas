const Database = require('../db/config')

module.exports = {
     async index(request, response) {
        const db = await Database();
        const roomId= request.params.room; 
        const questionId = request.params.question;
        const action = request.params.action;
        const password = request.body.password;

        /*Verifica se a senha está correta*/
        const verifyRoom =  await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.password === password){
            if(action == "delete") {
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            response.redirect(`/question-room/${roomId}`)
        } else{
            response.render('password-incorrect', {roomId: roomId})
        }
       
    },

    async create(req, res){
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/question-room/${roomId}`)
    }
}