import { List, Dropdown, Tooltip, Input, notification  } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useEffect, useState } from 'react'
import { getIssue, queryIssue } from './../axios'
import { EditModal, CreateModal } from './modal'
import { EllipsisOutlined, FormOutlined, DeleteOutlined, PlusOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import './../css/List.css'

const { Search } = Input;

const ContainerHeight = 400;
var page_cnt = 1;

const MyList = styled(VirtualList)`
  postion: relative;
  height: 90%;
  width: 100%;
  padding: 0 10px 30px 10px;
`;

const MyDropdown = styled(Dropdown)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: #161616;
  display: flex;
  aligh-items: center;
  justify-content: center;
  font-size: medium;
  margin-right: 10px;
  &:hover{
    background-color: #9096a0;
    color: white;
    transition-duration: 0.3s;
  }
`;

const AddTaskBtn = styled(Tooltip)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f5f5f5;
  color: #161616;
  display: flex;
  aligh-items: center;
  justify-content: center;
  position: absolute;
  top: -55px;
  right: 20px;
`;

const SortBtn = styled(Tooltip)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid #f5f5f5;
  color: #161616;
  display: flex;
  aligh-items: center;
  justify-content: center;
  position: absolute;
  top: -55px;
  right: 60px;
`;

const TaskList = ({ labels }) => {
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultBody, setDefaultBody] = useState("");
  const [issueUrl, setIssueUrl] = useState("");
  const [ascending, setAscending] = useState(false);

  const [api] = notification.useNotification();
  const openNotification = (text, placement) => {
    api.info({
      message:  `${text}`,
      description: "",
      placement,
    });
  };

  const toggleEditModal = (url, title, body) => {
    if ( body !== undefined ){
      setDefaultTitle(title);
      setDefaultBody(body);
      setIssueUrl(url);
    }
    setEditModalOpen(!editModalOpen);
  };

  const toggleCreateModal = () => {
    setCreateModalOpen(!createModalOpen);
  };

  const appendData = async () => {
    if (labels === "") {
      var results = await getIssue(page_cnt, labels);
    } else {
      var results = await getIssue(0, labels);
    }

    if (results.length !== 0) {
      setData(data.concat(results));
      openNotification(`${results.length} more tasks loaded!`, "top");
      page_cnt += 1;
    }
  };

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  const onSearch = async (value) => {
    const result = await queryIssue(value);
    setData(result['items']);
  };

  const changeSortMethod = () => {
    setAscending(!ascending);
  }

  useEffect(() => { 
    appendData();
  }, []);

  useEffect(() => {
    data.reverse();
    setData([...data]);
  }, [ascending])

  return (
    <>
      <AddTaskBtn title="Create a new task">
        <PlusOutlined onClick={toggleCreateModal}/>
        <CreateModal 
            createModalOpen={createModalOpen} 
            setCreateModalOpen={setCreateModalOpen} 
            toggleModal={toggleCreateModal}
        />
      </AddTaskBtn>
      <SortBtn title="Click to sort by created time">
        <SortAscendingOutlined onClick={changeSortMethod}/>
      </SortBtn>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <List>
        <MyList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item 
              key={item.url}
              id={item.url}
            >
              <List.Item.Meta
                title={item.title}
                description={item.body}
              />
              <div
                style={{ color: "#9096a0"}}
                onClick={()=>toggleEditModal(item.url, item.title, item.body)}
              >
                <FormOutlined style={{marginRight: "10px"}} />
              </div>
              <div style={{ color: "#ef4444"}}>
                <DeleteOutlined style={{marginRight: "10px"}}/>
              </div>
            </List.Item>
          )}
        </MyList>
      </List>
      <EditModal 
        editModalOpen={editModalOpen} 
        setEditModalOpen={setEditModalOpen} 
        toggleModal={toggleEditModal}
        issueUrl={issueUrl}
        defaultTitle={defaultTitle}
        defaultBody={defaultBody}
      />
    </>
  );
};

export { TaskList };