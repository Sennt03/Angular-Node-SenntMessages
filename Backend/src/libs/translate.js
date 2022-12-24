const { translate } = require('free-translate')

async function translateMessages(data, messages){
    let language
    let translateComp = true
    try{
      language = JSON.parse(data).abr
    }catch{
      translateComp = false
    }

    if(!translateComp){
        return messages
    }

    const promisesTranslate = []
    messages.forEach(message => {
        if(message.message.trim()){
            promisesTranslate.push(translate(message.message, { to: language }))
        }
    });

    const messagesTranslated = await Promise.all(promisesTranslate)
    messages.forEach((message, index) => {
        message.message = messagesTranslated[index]
    });
    return messages

}

module.exports = {
    translateMessages
}