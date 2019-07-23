import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class HobbyList extends Component {

  componentDidMount() { // react lifecycle method
    this.props.getItems();
  }

  onDeleteCLick = id => {
    this.props.deleteItem(id);
  }

  render() {
    const { items } = this.props.item; // pull out items from this.state (destructuring)
    return (
      <Container>

        <ListGroup>
          <TransitionGroup className="hobby-list">
            {items.map(({_id, name}) => (
              <CSSTransition key={_id} timeout={500}>
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteCLick.bind(this, _id)}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

HobbyList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(HobbyList);
