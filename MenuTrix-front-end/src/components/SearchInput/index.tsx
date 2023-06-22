import { FaSearch } from 'react-icons/fa';
import { IconStyle, InputStyle, SearchInputStyle } from './style';
import { InputHTMLAttributes, ReactElement } from 'react';

export const SearchInput = ({
  value,
  selected,
  ...props
}: PropsSearchInput): ReactElement<PropsSearchInput> => {
  return (
    <SearchInputStyle>
      <InputStyle {...props} type='text' />
      {selected && (
        <IconStyle>
          <FaSearch className='search-icon' />
        </IconStyle>
      )}
    </SearchInputStyle>
  );
};

interface PropsSearchInput extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  selected: boolean;
}
