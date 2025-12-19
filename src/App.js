import './App.css';
import styled from 'styled-components';
import { Component } from 'react';
export const Header = styled.header`
  width: 100%;
  background: #4b5bbf;
  padding: 14px 0;
`;

export const SearchBox = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.4);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.18);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const LoadMore = styled.button`
  display: block;
  margin: 40px auto 10px;
  padding: 12px 28px;
  background: #4b5bbf;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #3d4cb0;
  }
`;


class App extends Component {
state={
  gif: [],
  page: 1,
}

 api=()=>{
  fetch(`https://pixabay.com/api/?q=${document.querySelector('#input').value}&page=${this.state.page}&key=50978158-2e1c075068d4fb19bda657fd9&image_type=photo&orientation=horizontal&per_page=12`)
  .then(res => res.json())
  .then(data => {
    this.setState({ gif: data.hits });
  })
 }

 button=()=>{
  this.setState(
    num=>({ page: num.page + 1 }),
    this.api
  );
 }
 
  render(){return (
   <>
<Header>
  <SearchBox>
  <Input
  id='input' onChange={this.api}
  />
  </SearchBox>

</Header>
<Container>
  <Grid>
      {this.state.gif.map(obj => (
        <Card key={obj.id}>
          <Image src={obj.largeImageURL} alt="" />
        </Card>
      ))}
  </Grid>
  <LoadMore onClick={this.button}>Load more</LoadMore>
</Container>
</>



  )}
}

export default App;