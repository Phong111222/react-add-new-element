import { FC, useRef } from 'react';
import styled from 'styled-components';
import BoxItem from './BoxItem';

const StyledBoxList = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => {
    return new Array(props.$columns)
      .fill('')
      .map(() => '1fr')
      .join(' ');
  }};
  grid-gap: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const StyledBoxItem = styled(BoxItem)`
  flex: 1;
`;

const EmptySpace = styled.div`
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 1;
  transform: translateX(100%);
`;

interface Props {
  list: { id: number; value: string }[];
  columns: number;
  onPressGap: (newIndex: number) => void;
  onChangeList: (newList: { id: number; value: string }[]) => void;
}

const BoxList: FC<Props> = ({ list, columns, onPressGap, onChangeList }) => {
  const newIDRef = useRef<number>(0);

  const _onPressGap = (newIndex: number) => {
    newIDRef.current = newIndex;
    onPressGap(newIndex);
  };

  const onSave = (changeId: number) => (value: string) => {
    newIDRef.current = 0;
    onChangeList(
      list.map((ele) => (ele.id === changeId ? { ...ele, value } : ele))
    );
  };

  return (
    <StyledBoxList $columns={columns}>
      {list.map((ele, index) => {
        return (
          <Container key={ele.id}>
            <StyledBoxItem
              isEdit={newIDRef.current !== 0 && newIDRef.current === ele.id}
              title={ele.value}
              onSave={onSave(ele.id)}
            />
            {index < list.length - 1 && (
              <EmptySpace onClick={() => _onPressGap(index + 1)} />
            )}
          </Container>
        );
      })}
    </StyledBoxList>
  );
};

export default BoxList;
