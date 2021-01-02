import React, { Component } from 'react';
import CardFlip from 'react-native-card-flip';
import { Ionicons } from '@expo/vector-icons';
import { Card, Paragraph, withTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

class CurrentQuizCard extends Component {
  constructor(props) {
    super(props);
    this.card = null;
  }

  flipCard = () => {
    this.card?.flip();
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
          title="Question #1"
        />
        <Card.Content>
          <Paragraph>Lorem Ipsum Dolor sit amet</Paragraph>
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
          title="Answer #1"
        />
        <Card.Content>
          <Paragraph>Lorem Ipsum Dolor sit amet</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <CardFlip style={styles.cardContainer} ref={(card) => (this.card = card)}>
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
