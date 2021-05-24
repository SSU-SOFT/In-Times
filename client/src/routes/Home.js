import React from 'react';
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import {Menu, TodoTemplate, TodoHead, TodoItem, TodoCreate} from '../components';

const GlobalStyle = createGlobalStyle`
  body {
    background : #e9ecef;
  }
`;

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      lists : [],
      len : 0
    }
  }

  componentDidMount(){
    const lists = [
        {
            id : 1,
            text : "프로젝트 생성하기",
            done : true,
        },
        {
            id : 2,
            text : "컴포넌트 스타일링 하기",
            done : true,
        },
        {
            id : 3,
            text : "API 적용하기",
            done : false,
        },
        {
            id : 4,
            text : "기능 구현하기",
            done : false,
        },
    ]
    this.setState({lists:lists});
    this.setState({len : lists.filter(list => list.done === false).length})
    this.onToggle = this.onToggle.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onRemove = async(id) => {
    await this.setState({lists:this.state.lists.filter(list => list.id !== id)});
    this.setState({len : this.state.lists.filter(list => list.done === false).length})
  }

  onToggle(id) {
    let i;
    const NewTodo = this.state.lists.find((val, index)=>{
      if(val.id === id){
        i = index;
        return true;
      }
    })
    this.state.lists.splice(i, 1, {id:NewTodo.id, text:NewTodo.text, done:!NewTodo.done});
    this.setState({len : this.state.lists.filter(list => list.done === false).length});
  }

  onSubmit(text){
    alert(text);
  }

  render(){
    const {lists, len} = this.state;
    return (
      <div>
        <Menu />
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead len={len}/>
          <TodoListBlock>
            {lists.map((val, index)=>{
                return (
                    <TodoItem key={val.id} Todo={val} onToggle={this.onToggle} onRemove={this.onRemove}></TodoItem>
                );
            })}
          </TodoListBlock>
          <TodoCreate onSubmit={this.onSubmit}/>
        </TodoTemplate>
      </div>
    );
  }
};

export default Home;