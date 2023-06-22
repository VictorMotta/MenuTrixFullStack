import { styled } from 'styled-components';

export const SearchInputStyle = styled.div`
  width: 55%;
  position: relative;
  display: inline-block;
`;

export const InputStyle = styled.input`
  width: 100%;
  padding-right: 2.5rem;
  background: #ffffff;
  border: 1px solid #80aac8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 15px 20px;
  border-radius: 20px;
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #80aac8;
  border: none;
  &::placeholder: {
    color: #80aac8;
  }
`;

export const IconStyle = styled.div`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  color: #80aac8;
  font-size: 24px;
`;
