import { Tabs } from 'antd'
import { TaskList } from './taskList'
import './../css/Tab.css'

const TabsContent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  
  const items = [
    {
      key: '1',
      label: `All`,
      children: <TaskList labels ={""}/>,
    },
    {
      key: '2',
      label: `Open`,
      children: <TaskList labels ={"Open"}/>,
    },
    {
      key: '3',
      label: `In Progress`,
      children: <TaskList labels ={"In Progress"}/>,
    },
    {
      key: '4',
      label: `Done`,
      children: <TaskList labels={"Done"}/>,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};

export { TabsContent };