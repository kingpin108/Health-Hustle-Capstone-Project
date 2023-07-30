import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    zIndex: 1
  },
  appHeaderTitle: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 10
  },
  feedbackInput: {
    marginTop: 10
  },
  feedbackList: {
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  feedbackItem: {
    backgroundColor: '#f3e3ff',
    marginBottom: 10,
    padding: 5,
    borderRadius: 10
  }
});

export default styles;