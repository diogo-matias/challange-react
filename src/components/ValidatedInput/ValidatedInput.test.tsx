import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ValidatedInput from './index';

describe('ValidatedInput', () => {
  it('renderiza o label e o placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <ValidatedInput label="Nome" placeholder="Digite seu nome" value="" onChangeText={() => {}} />
    );
    expect(getByText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu nome')).toBeTruthy();
  });

  it('exibe mensagem de erro', () => {
    const { getByText } = render(
      <ValidatedInput label="Email" error="Campo obrigatório" value="" onChangeText={() => {}} />
    );
    expect(getByText('Campo obrigatório')).toBeTruthy();
  });

  it('chama onChangeText ao digitar', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <ValidatedInput placeholder="Digite algo" value="" onChangeText={onChangeText} />
    );
    fireEvent.changeText(getByPlaceholderText('Digite algo'), 'abc');
    expect(onChangeText).toHaveBeenCalledWith('abc');
  });
}); 