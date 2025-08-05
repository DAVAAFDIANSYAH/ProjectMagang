import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#007A6F',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#6ED84C',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpLink: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default loginStyles;
