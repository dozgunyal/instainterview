import React, { useRef, useEffect, useState  } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition"; 
import * as convert from 'xml-js';


const propTypes = {
  // Props injected by SpeechRecognition
  finalTranscript: PropTypes.string,
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

const Dictaphone = ({
  finalTranscript,
  browserSupportsSpeechRecognition
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const [sentenceList, setSentenceList] = useState([]);
  const [count, setCount] = useState(0);
  const callService = (sentence,sentenceId) => {
    fetch("/checkDocument?data="+sentence.replace(/\s/g, '+'))
    .then(response => response.text()) 
      .then(
        (result) => {
            let resultJSON = JSON.parse(convert.xml2json(result,{compact: true}));
            console.log(resultJSON);
            if(resultJSON.results && resultJSON.results.error && resultJSON.results.error.description){
              let suggestion = '';
              let result = resultJSON.results.error.description["_text"];
              if(resultJSON.results.error.suggestions && resultJSON.results.error.suggestions.option && resultJSON.results.error.suggestions.option["_text"]){
                suggestion = resultJSON.results.error.suggestions.option["_text"];
              }
              if(resultJSON.results.error.suggestions && resultJSON.results.error.suggestions.option && resultJSON.results.error.suggestions.option.length > 0){
                suggestion = resultJSON.results.error.suggestions.option.map(item => item["_text"]).join(', ');
              }
              setSentenceList(sentenceList.concat({
                sentence,
                sentenceId,
                result,
                suggestion
              }));
            }  
        },
        (error) => {
            console.log(error);
        }
      )
  }


  const prevValue = usePrevious({finalTranscript});
  useEffect(() => {
    if(prevValue && prevValue.finalTranscript !== finalTranscript) {
        let sentenceId = count;
        setCount(count+1);
        let sentence = finalTranscript.substring(prevValue.finalTranscript.length);
        setSentenceList(sentenceList.concat({
          sentence: sentence,
          sentenceId: sentenceId,
          result: '',
          suggestion: ''
        }));
        callService(sentence, sentenceId);
    }
}, [finalTranscript])
  
  return (
    <div>
      <div className="hero-body">
        <div style={{ heigth: '100%', width: '100%' }}>
          {sentenceList.map((item) => {
            return (
              <p key={item.sentenceId} style={{ padding: '.25em', textAlign: 'left', overflowWrap: 'normal' }}>
                <span className={`tag is-medium is-success`}>{item.sentence}</span>
                {item.result &&
                  <span>&nbsp;<span className={`tag is-medium is-danger`}>{item.result}</span></span>
                }
                {item.suggestion &&
                  <span>&nbsp;<span className={`tag is-medium is-warning`}>{item.suggestion}</span></span>
                }
              </p>
            )}
          )}
        </div> 
      </div>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);