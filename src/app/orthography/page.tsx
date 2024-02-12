'use client'
import React, {useState} from 'react'
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from '@/components';
import { Message } from 'postcss';
import { orthographyUseCase } from '@/use-cases';

 const Orthography = () => {
  const [messages, setMessages] = useState<Message[]>([])
console.log(messages);

  const handlePost = async( text: string ) => {

    // setIsLoading(true);
    setMessages( (prev:any) => [...prev, { text: text, isGpt: false }] );

    const { ok, errors, message, userScore } = await orthographyUseCase(text);
    if ( !ok ) {
      setMessages( (prev:any) => [...prev, { text: 'No se pudo realizar la corrección', isGpt: true }] );
    } else {
      setMessages( (prev:any) => [...prev, { 
        text: message, isGpt: true,  
        info: {errors,message,userScore}
      }]);
    }
  }

  return (
    <div className="chat-container">
    <div className="chat-messages">
      <div className="grid grid-cols-12 gap-y-2">
        {/* Bienvenida */}
        <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

        {
          messages.map( (message, index) => (
            message.isGpt
              ? (
                <GptOrthographyMessage 
                  key={ index }  
                  { ...message.info! }
                />
              )
              : (
                <MyMessage key={ index } text={ message.text } />
              )
              
          ))
        }

        
      {/*   {
          isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )
        } */}
        

      </div>
    </div>


    <TextMessageBox
      onSendMessage={ handlePost }
      placeholder='Escribe aquí lo que deseas'
      disableCorrections
    />

  </div>
  )
}
export default Orthography;