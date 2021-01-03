import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardFlip from 'react-native-card-flip';
import { Ionicons } from '@expo/vector-icons';
import { Card, Paragraph, withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import CardType from '../shared/prop-types/CardType';

class CurrentQuizCard extends Component {
  static propTypes = {
    card: CardType.isRequired,
  };

  constructor(props) {
    super(props);
    this.cardView = React.createRef();
  }

  flipCard = () => {
    this.cardView.current?.flip();
  };

  renderCard = () => {
    return (
      <Card>
        <Card.Title
          left={(props) => (
            <Ionicons
              color={this.props.theme.colors.text}
              name="md-help-circle-outline"
              {...props}
            />
          )}
          title={`Question #${this.props.card.cardNumber}`}
        />
        <Card.Content>
          <Paragraph>{this.props.card.question}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  renderAnswer = () => {
    return (
      <Card onPress={this.flipCard}>
        <Card.Title
          left={(props) => (
            <Ionicons
              color={this.props.theme.colors.text}
              name="md-bulb-outline"
              {...props}
            />
          )}
          title={`Answer #${this.props.card.cardNumber}`}
        />
        <Card.Content>
          <Paragraph>{this.props.card.answer}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <CardFlip style={styles.cardContainer} ref={this.cardView}>
        {this.renderCard()}
        {this.renderAnswer()}
      </CardFlip>
    );
  }
}

export default withTheme(CurrentQuizCard);

const styles = StyleSheet.create({
  cardContainer: {
    width: 'auto',
    height: 200,
  },
});
