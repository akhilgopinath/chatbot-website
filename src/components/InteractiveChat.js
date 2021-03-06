import React from 'react';
import uuid from 'uuid';
import { Segment } from 'semantic-ui-react';

const getMessageProps = (message) => ({
  floated: message.author === 'Pavel' ? 'left' : 'right',
  inverted: message.author === 'Pavel' ? false : true,
  color: message.author === 'Pavel' ? null : 'blue',
  loading: message.loading ? true : false,
  style: getMessageStyle(message),
});

const getMessageStyle = (message) => ({
  marginLeft: (message.author === 'Pavel' ? 'auto' : '20px'),
  marginRight: (message.author === 'Pavel' ? '20px' : 'auto'),
});

const getOptionStyle = () => ({
  display: 'inline-block',
  marginLeft: '5px',
});

export const InteractiveChat = (props) => {
  const messageNodes = props.messages.map((message) => {
    const props = getMessageProps(message);
    return (
      <div key={uuid.v4()}>
        <Segment key={uuid.v4()} {...props}>
          {message.message}
        </Segment>
        <div style={{clear: 'both'}}/>
      </div>
    );
  });

  const optionsGetInput = (options) => {
    return options.find((o) => o.type === 'input');
  }

  const optionNodes = props.options.map((option) => {
    return (
      <a
        href="javascript: void(0)"
        onClick={() => { props.onSubmit(option); }}
        key={uuid.v4()}
      >
        <Segment color="blue" style={getOptionStyle()}>{option.title}</Segment>
      </a>
    );
  });

  const handleKeyPress = (event) => {
    console.log(event);
  };

  return (
    <div>
      {messageNodes}
      <div style={{clear: 'both'}}/>
      { !!props.options.length &&
        <div style={{textAlign: 'center'}}>
          {optionNodes}
        </div>
      }
    </div>
  );
};

InteractiveChat.propTypes = {
  messages: React.PropTypes.array,
  options: React.PropTypes.array,
  onSubmit: React.PropTypes.func,
};

InteractiveChat.defaultProps = {
  messages: [],
  options: [],
};
