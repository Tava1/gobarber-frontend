import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false); // Armazendando o focus do input
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName, // name do input
      ref: inputRef.current, // ref: acesso o input especifico do html
      path: 'value', // document.querySelector('input').value
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setIsFocused(true)} // Capaz de saber quando o input ganha o foco
        onBlur={() => setIsFocused(false)} // e ...quando perde os foco
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
