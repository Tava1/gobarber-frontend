import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

/*
  useCallback: é uma forma de criar functions detro do componente que não são
  recriadas na memória toda vez que aquele componente atualiza. Serão memoriazadas
*/

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false); // Armazendando o focus do input
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  // REGRA: sempre que for criar uma function dentro de um componente useCallback!
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value); // se hover valor: true. se nao houver: false
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName, // name do input
      ref: inputRef.current, // ref: acesso o input especifico do html
      path: 'value', // document.querySelector('input').value
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus} // Capaz de saber quando o input ganha o foco
        onBlur={handleInputBlur} // e ...quando perde os foco
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
