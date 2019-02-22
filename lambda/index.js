/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'hey, what animal sound would you like to hear?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const AnimalSoundIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnimalSoundIntent';
  },
   async handle(handlerInput) {
    
    const getId = handlerInput.requestEnvelope.request.intent.slots.animal.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const getAnimal = handlerInput.requestEnvelope.request.intent.slots.animal.value;
    console.log(getId);
    const getSounds = await getAnimalSound(getId);
    
    console.log('getlink'+getSounds);
    
    
    
    const speechText = 'Get ready for a '+ getAnimal+' sound.!'+ '<audio src="'+getSounds+'" />';

    return handlerInput.responseBuilder
      .speak(speechText + 'What another sounds do you like')
      .reprompt('What another sounds do you like ?')
      .getResponse();
  },
};

function getAnimalSound(soundId){

  switch (parseInt(soundId)) {
    case 1:
     var sound = "https://s3-eu-west-1.amazonaws.com/animalssound/lion.mp3";
      break;
    case 2:
       sound = "https://s3-eu-west-1.amazonaws.com/animalssound/giraffe.mp3";
      break;
    case 3:
      sound = "https://s3-eu-west-1.amazonaws.com/animalssound/dog.mp3";
      break;
    case 4:
      sound = "https://s3-eu-west-1.amazonaws.com/animalssound/elephant.mp3";
      break;
    case 5:
    sound = "https://s3-eu-west-1.amazonaws.com/animalssound/cow.mp3";
    break;
  }
  return sound;
}


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Animal Sounds', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Animal Sounds', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AnimalSoundIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

