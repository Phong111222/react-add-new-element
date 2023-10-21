import React, {
  FC,
  HTMLProps,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hook/useClickOutside';
import { useCtrlS } from '../../hook/useCtrlS';

const StyledBox = styled.div`
  min-width: 100px;
  min-height: 100px;
  border-radius: 5px;
  background-color: #ffffff;
  background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  &:focus {
    outline: none;
  }
`;

interface Props {
  title: string;
  isEdit?: boolean;
  onChange?: HTMLProps<HTMLInputElement>['onChange'];
  onClick?: HTMLProps<HTMLDivElement>['onClick'];
  onSave?: (currentValue: string) => void;
  isNew?: boolean;
  className?: string;
}

const BoxItem: FC<Props> = forwardRef<any, Props>(
  ({ title = '', onChange, isEdit, onClick, className, onSave }, boxRef) => {
    const [isEditing, setIsEditing] = useState(() => {
      return isEdit !== undefined ? isEdit : false;
    });

    useImperativeHandle(boxRef, () => ({
      handleChangeEditState: (edit: boolean) => setIsEditing(edit),
    }));

    const inputRef = useRef<HTMLInputElement>(null);

    const onTitleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsEditing(true);
    };

    useEffect(() => {
      if (isEditing) {
        if (inputRef.current) {
          inputRef.current.focus?.();
          inputRef.current.value = title;
        }
      }
    }, [isEditing, isEdit]);

    useOnClickOutside(inputRef, () => setIsEditing(false));

    const _onSave = useCallback(() => {
      setIsEditing(false);
      onSave?.(inputRef.current ? inputRef.current?.value : '');
    }, [isEditing, onSave]);

    useCtrlS(inputRef, _onSave);

    return (
      <StyledBox onClick={(e) => onClick?.(e)} className={className}>
        {isEditing ? (
          <StyledInput ref={inputRef} onChange={onChange} />
        ) : (
          <span onClick={onTitleClick}>{title}</span>
        )}
      </StyledBox>
    );
  }
);

export default BoxItem;
