import { useState } from 'react';
import BoxList from './components/boxes/BoxList';

const date = Number(new Date());

const initialList = [
  { value: 'Todo 1', id: date + 1 },
  { value: 'Todo 2', id: date + 2 },
  { value: 'Todo 3', id: date + 3 },
];

function App() {
  const [list, setList] = useState(initialList);

  const onPressGap = (newIndex: number) => {
    const newList = [...list];

    newList.splice(newIndex, 0, {
      id: newIndex,
      value: '',
    });

    setList(newList);
  };

  const handleChangeList = (newList: typeof list) => {
    setList(newList);
  };

  return (
    <BoxList
      onChangeList={handleChangeList}
      onPressGap={onPressGap}
      columns={list.length}
      list={list}
    />
  );
}

export default App;
